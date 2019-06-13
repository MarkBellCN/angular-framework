/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, NavigationEnd, Router, RouteConfigLoadEnd} from "@angular/router";
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {AbstractAuthProvider} from '../../../framework/auth/providers/abstract-auth.provider';
import {HttpService} from '../../../framework/common/http.service';
import {ResponseData} from '../../../framework/common/response.data';
import {ResultEnum} from '../../common/enum';
import {AuthProviderConfig} from '../../../framework/auth/providers/auth.options';
import {AuthResult} from '../../../framework/auth/service/auth.service';
import {getDeepFromObject} from '../../../framework/helpers';
@Injectable()
export class UserNamePassAuthProvider extends AbstractAuthProvider {
  //Auth进行验证的配置
  protected defaultConfig: AuthProviderConfig = {
    baseEndpoint: '/sims/management',
    login: {
      alwaysFail: false,
      rememberMe: true,
      endpoint: '/auth',
      method: 'post',
      redirect: {
        success: '/pages',
        failure: '/pages',
      },
      defaultErrors: [''],
      defaultMessages: [''],
    },
    logout: {
      alwaysFail: false,
      endpoint: 'auth/logout',
      method: 'delete',
      redirect: {
        success: '/auth/login',
        failure: null,
      },
      defaultErrors: [''],
      defaultMessages: [''],
    },
    token: {
      key: 'data.token',
      getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res,
        this.getConfigValue('token.key')),
    },
  };

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    super();
  }

  authenticate(data?: any): Observable<AuthResult> {
    const method = this.getConfigValue('login.method');
    const url = this.getActionEndpoint('login');
    return this.httpService.request(method, url, data)
      .map((res) => {
        if (this.getConfigValue('login.alwaysFail')) {
          throw this.createFailResponse(data);
        }
        let result = res.body;
        return new ResponseData(
          result.code,
          result.msg,
          result.data
        )
      })
      .map((res) => {
        let success = false;
        if (res.code == ResultEnum.SUCCESS.value) {
          success = true;
        }
        return new AuthResult(
          success,
          res,
          this.getConfigValue('login.redirect.success'),
          [res.code],
          [res.msg],
          this.getConfigValue('token.getter')('login', res));
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = this.getConfigValue('errors.getter')('login', res);
        } else {
          errors.push('Something went wrong.');
        }
        return Observable.of(
          new AuthResult(
            false,
            res,
            this.getConfigValue('login.redirect.failure'),
            errors,
          ));
      });
  }

  logout(): Observable<AuthResult> {
    const method = this.getConfigValue('logout.method');
    const url = null;
    return Observable.of({})
      .switchMap((res: any) => {
        if (!url) {
          return Observable.of(res);
        }
        return this.httpService.request(method, url, {observe: 'response'});
      })
      .map((res) => {
        if (this.getConfigValue('logout.alwaysFail')) {
          throw this.createFailResponse();
        }

        return res;
      })
      .map((res) => {
        return new AuthResult(
          true,
          res,
          this.getConfigValue('logout.redirect.success'),
          [],
          []
        )
      })
      .catch((res) => {
        let errors = [];
        if (res instanceof HttpErrorResponse) {
          errors = [];
        } else {
          errors.push('Something went wrong.');
        }
        return Observable.of(
          new AuthResult(
            false,
            res,
            this.getConfigValue('logout.redirect.failure'),
            errors,
          ));
      });
  }

  protected getActionEndpoint(action: string): string {
    const actionEndpoint: string = this.getConfigValue(`${action}.endpoint`);
    const baseEndpoint: string = this.getConfigValue('baseEndpoint');
    return baseEndpoint + actionEndpoint;
  }
}
