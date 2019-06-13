/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {Injectable, Optional, Inject, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AbstractAuthProvider} from '../../../framework/auth/providers/abstract-auth.provider';
import {AuthSimpleToken,TokenService} from '../../../framework/auth/service/token.service';
import {AUTH_PROVIDERS_TOKEN} from '../../../framework/auth/auth.options';
import {PermissionService} from "./permission.service";
/**
 * 验证结果
 */
export class AuthResult {

  protected token: any;
  protected errors: string[] = [];
  protected messages: string[] = [];

  constructor(protected success: boolean,//是否成功
              public response?: any,//返回的请求体
              protected redirect?: any,//重定向页面
              errors?: any,//错误信息，错误码等
              messages?: any,//错误提示
              token?: AuthSimpleToken//请求到的token
  ) {
    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }
    this.token = token;
  }

  getResponse(): any {
    return this.response;
  }

  getTokenValue(): any {
    return this.token;
  }

  replaceToken(token: AuthSimpleToken): any {
    this.token = token
  }

  getRedirect(): any {
    return this.redirect;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
/**
 * 验证服务
 */
@Injectable()
export class AuthService {
  constructor(public tokenService: TokenService,
              public injector: Injector,
              public permissionService:PermissionService,
              @Optional() @Inject(AUTH_PROVIDERS_TOKEN) protected providers = {}) {
  }

  getToken(): Observable<AuthSimpleToken> {
    return this.tokenService.get();
  }

  isAuthenticated(): Observable<any> {
    return this.getToken().map(token => token && token.getValue());
  }

  onTokenChange(): Observable<AuthSimpleToken> {
    return this.tokenService.tokenChange();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange().map(token => !!token);
  }

  //验证
  authenticate(provider: string, data?: any): Observable<AuthResult> {
    return this.getProvider(provider).authenticate(data)
      .switchMap((result: AuthResult) => {
        this.tokenService.clear()
        if (result.isSuccess() && result.getTokenValue()) {
          return this.tokenService.set(result.getTokenValue())
            .switchMap(_ => this.tokenService.get())
            .map(token => {
              result.replaceToken(token);
              return result;
            });
        }
        return Observable.of(result);
      });
  }

  //退出
  logout(provider: string): Observable<AuthResult> {
    return this.getProvider(provider).logout()
      .do((result: AuthResult) => {
        if (result.isSuccess()) {
          this.tokenService.clear().subscribe(() => {
          });
          this.permissionService.clean();
        }
      });
  }

  //获取到真实的验证逻辑类，由配置提供
  getProvider(provider: string): AbstractAuthProvider {
    if (!this.providers[provider]) {
      throw new TypeError(`auth provider '${provider}' is not registered`);
    }

    return this.injector.get(this.providers[provider].service);
  }
}

