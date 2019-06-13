/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
declare const Buffer;
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AUTH_OPTIONS_TOKEN, AUTH_TOKEN_WRAPPER_TOKEN} from '../../../framework/auth/auth.options';
import {deepExtend, getDeepFromObject, urlBase64Decode} from '../../../framework/helpers';
@Injectable()
export class AuthSimpleToken {
  protected token: string = '';

  setValue(token: string) {
    this.token = token;
  }

  getValue() {
    return this.token;
  }
}

@Injectable()
export class AuthJWTToken extends AuthSimpleToken {

  getPayload(): any {
    const parts = this.token.split('.');

    if (parts.length !== 3) {
      throw new Error(`The token ${this.token} is not valid JWT token and must consist of three parts.`);
    }

    const decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error(`The token ${this.token} is not valid JWT token and cannot be decoded.`);
    }

    return JSON.parse(decoded);
  }

  getTokenExpDate(): Date {
    const decoded = this.getPayload();
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }
}
/**
 * Token服务
 */
@Injectable()
export class TokenService {

  getUserDetailsFromLocalStorge(): Observable<any> {
    return this.get().map(authSimpleToken => {
      if (authSimpleToken.getValue()) {
        let userDetails = this.parseToken(authSimpleToken.getValue());
        return Observable.of(userDetails);
      } else {
        return Observable.of({});
      }
    })
  }

  //Token存放到localStorage中
  protected defaultConfig: any = {
    token: {
      key: 'auth_app_token',
      getter: (): Observable<AuthSimpleToken> => {
        const tokenValue = localStorage.getItem(this.getConfigValue('token.key'));
        this.tokenWrapper.setValue(tokenValue);
        return Observable.of(this.tokenWrapper);
      },

      setter: (token: string | AuthSimpleToken): Observable<null> => {
        const raw = token instanceof AuthSimpleToken ? token.getValue() : token;
        localStorage.setItem(this.getConfigValue('token.key'), raw);
        return Observable.of(null);
      },

      deleter: (): Observable<null> => {
        localStorage.removeItem(this.getConfigValue('token.key'));
        return Observable.of(null);
      },
    },
  };
  protected config: any = {};
  protected token$ = new BehaviorSubject(null);

  constructor(@Inject(AUTH_OPTIONS_TOKEN) protected options: any,
              @Inject(AUTH_TOKEN_WRAPPER_TOKEN) protected tokenWrapper: AuthSimpleToken) {
    this.setConfig(options);
    this.get().subscribe(token => this.publishToken(token));
  }

  setConfig(config: any): void {
    this.config = deepExtend({}, this.defaultConfig, config);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  set(rawToken: string): Observable<null> {
    return this.getConfigValue('token.setter')(rawToken)
      .switchMap(_ => this.get())
      .do((token: AuthSimpleToken) => {
        this.publishToken(token);
      });
  }


  get(): Observable<AuthSimpleToken> {
    return this.getConfigValue('token.getter')();
  }

  tokenChange(): Observable<AuthSimpleToken> {
    return this.token$;
  }

  parseToken(token: string) {
    if (token == null || '' == token) {
      return null;
    }
    let dataArray: string[] = token.split(".")
    let jsonStr: string = this.base64decoder(dataArray[1]);
    let jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  }

  base64decoder(Context): any {
    let decoder: string = new Buffer(Context, 'base64').toString();
    return decoder;
  }

  clear(): Observable<any> {
    this.publishToken(null);
    return this.getConfigValue('token.deleter')();
  }

  protected publishToken(token: AuthSimpleToken): void {
    this.token$.next(token);
  }
}
