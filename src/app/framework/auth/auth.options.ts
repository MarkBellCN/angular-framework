/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {InjectionToken} from '@angular/core';

export interface AuthOptions {
  forms?: any;
  providers?: any;
}

export interface AuthProviders {
  data: any;
}
export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 500,
      provider: 'username',
      rememberMe: true,
    },
    logout: {
      redirectDelay: 500,
      provider: 'username',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      username: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },

};
export const AUTH_OPTIONS_TOKEN = new InjectionToken<AuthOptions>('Auth Options');
export const AUTH_USER_OPTIONS_TOKEN = new InjectionToken<AuthOptions>('User Auth Options');
export const AUTH_PROVIDERS_TOKEN = new InjectionToken<AuthProviders>('Auth Providers');
export const AUTH_TOKEN_WRAPPER_TOKEN = new InjectionToken<AuthProviders>('Auth Token');
export const AUTH_INTERCEPTOR_HEADER = new InjectionToken<AuthProviders>('Simple Interceptor Header');
