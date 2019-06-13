import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router, RouteConfigLoadEnd} from "@angular/router";
import {Observable} from 'rxjs';
import {AuthService} from '../../../../framework/auth/service/auth.service';
import {AuthJWTToken} from '../../../../framework/auth/service/token.service';
import {AUTH_INTERCEPTOR_HEADER} from '../../../../framework/auth/auth.options';
import {ResultEnum} from '../../../common/enum';
import {NzMessageService} from '../../../../framework/ui-component';
import {mergeMap, catchError} from 'rxjs/operators';
import {of} from "rxjs/observable/of";
import {SharedService} from "../../../common/shared.service";
@Injectable()
export class AuthSimpleInterceptor implements HttpInterceptor {

  constructor(private injector: Injector,
              @Inject(AUTH_INTERCEPTOR_HEADER) protected headerName: string = 'Authorization',
              public router: Router,
              public nzMessageService: NzMessageService,
              public sharedService: SharedService,
              ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken()
      .switchMap((token: AuthJWTToken) => {
        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: token.getValue(),
            },
          });
        }
        return next.handle(req).pipe(
          mergeMap((event: any) => {
            // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
            if (event instanceof HttpResponse && event.status === 200)
              return this.handleData(event);
            // 若一切都正常，则后续操作
            return of(event);
          }),
          catchError((err: HttpErrorResponse) => this.handleData(err)),
        );
      });
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ):Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          let body = event.body;
          if (body.code != ResultEnum.SUCCESS.value && body.msg == 'diffToken') {
            this.nzMessageService.remove();
            this.nzMessageService.info("登录过期，请重新登录！！！")
            setTimeout(() => {
              this.router.navigateByUrl('auth/logout');
            }, 300)
          }else if (body.code != ResultEnum.SUCCESS.value && body.msg == 'unableUser') {
            this.nzMessageService.remove();
            this.nzMessageService.info("用户未启用，请用其他用户登录或联系管理员！！！")
            setTimeout(() => {
              this.router.navigateByUrl('auth/logout');
            }, 300)
          }
        }
        break;
      case 401:
        break;
      case 403:
      case 404:
      case 500:
        break;
      default:
        if (event instanceof HttpErrorResponse) {
          this.nzMessageService.info("请求超时,请重试");
          this.sharedService.send({desc:'HttpErrorResponse',data:event});
        }
        break;
    }
    return of(event);
  }

  protected get authService(): AuthService {
    return this.injector.get(AuthService);
  }
}
