/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgZorroAntdModule} from "../../framework/ui-component/components/ng-zorro-antd.module";
import {LogoutComponent, LoginComponent, AuthBlockComponent, AuthComponent} from '../../framework/auth/components';
import {AuthSimpleInterceptor, AuthSimpleToken, TokenService, AuthService,PermissionService} from '../../framework/auth/service';
import {UserNamePassAuthProvider} from '../../framework/auth/providers';
import {
  AuthOptions,
  defaultSettings,
  AUTH_USER_OPTIONS_TOKEN,
  AUTH_OPTIONS_TOKEN,
  AUTH_PROVIDERS_TOKEN,
  AUTH_TOKEN_WRAPPER_TOKEN,
  AUTH_INTERCEPTOR_HEADER,
} from '../../framework/auth/auth.options';
import {deepExtend} from '../../framework/helpers';
import {routes} from '../../framework/auth/auth.routes';
import {CustomDirectiveModule} from '../../framework/common';

export function authServiceFactory(config: any, tokenService: TokenService,permissionService: PermissionService, injector: Injector) {
  const providers = config.providers || {};
  for (const key in providers) {
    if (providers.hasOwnProperty(key)) {
      const provider = providers[key];
      const object = injector.get(provider.service);
      object.setConfig(provider.config || {});
    }
  }
  return new AuthService(tokenService, injector,permissionService, providers);
}

export function optionsFactory(options) {
  return deepExtend(defaultSettings, options);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    CustomDirectiveModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  declarations: [
    AuthComponent,
    AuthBlockComponent,
    LoginComponent,
    LogoutComponent,
  ],
  exports: [
    AuthComponent,
    AuthBlockComponent,
    LoginComponent,
    LogoutComponent,
  ],
})
export class AuthModule {
  static forRoot(authOptions?: AuthOptions): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: AuthModule,
      providers: [
        {provide: AUTH_USER_OPTIONS_TOKEN, useValue: authOptions},
        {provide: AUTH_OPTIONS_TOKEN, useFactory: optionsFactory, deps: [AUTH_USER_OPTIONS_TOKEN]},
        {provide: AUTH_PROVIDERS_TOKEN, useValue: {}},
        {provide: AUTH_TOKEN_WRAPPER_TOKEN, useClass: AuthSimpleToken},
        {provide: AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization'},
        {provide: HTTP_INTERCEPTORS, useClass: AuthSimpleInterceptor, multi: true},
        {
          provide: AuthService,
          useFactory: authServiceFactory,
          deps: [AUTH_OPTIONS_TOKEN, TokenService,PermissionService, Injector],
        },
        TokenService,
        PermissionService,
        UserNamePassAuthProvider,
      ],
    };
  }
}
