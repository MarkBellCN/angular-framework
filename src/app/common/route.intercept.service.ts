/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/5/7
 */
import {Injectable,ModuleWithProviders, NgModule,} from '@angular/core';
import {NavigationEnd, Router, NavigationStart} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {TokenService, SharedService, PermissionService} from '../framework';
import {filter} from 'rxjs/operator/filter';

@Injectable()
export class RouteInterceptService {
  private enabled: boolean;
  private token: string;

  constructor(private location: Location,
              private sharedService: SharedService,
              private router: Router,
              private titleService: Title,
              private permissionService: PermissionService,
              private tokenService: TokenService,) {
    this.enabled = true;
  }

  trackPageViews() {
    if (this.enabled) {
      filter.call(this.router.events, (event) => event instanceof NavigationStart)
        .subscribe((event) => {

        });
      filter.call(this.router.events, (event) => event instanceof NavigationEnd)
        .subscribe((event) => {
          //控制路由路由是否可以进该页面
          const location: string = event.url;
          if ((location === 'error') || (location.includes('error')) || location.substr(location.indexOf('#') + 1).includes('error')) {

          } else if ((location === 'auth') || (location.includes('auth')) || location.substr(location.indexOf('#') + 1).includes('auth')) {
            if (location.includes('logout')) {

            } else {
              if (this.hasToken()) {
                this.permissionService.loginRedirect();
              } else {
                this.router.navigateByUrl('/auth');
              }
            }
          } else {
            if (this.hasToken()) {
              if (location === '/pages') {
                this.permissionService.skipIndexUrl()
              }
            } else {
              this.router.navigateByUrl('/auth');
            }
          }
          this.setTitleAndWindowName(location);
        });
    }
  }

  hasToken() {
    this.setToken()
    if (this.token == null || "" == this.token) {
      return false;
    }
    return true;
  }

  //根据Url设置标题
  setTitleAndWindowName(url) {
    if (url.includes('auth')) {
      this.titleService.setTitle("登录");
      this.setWindowName('auth')
    } else {
      this.titleService.setTitle("安检信息管理系统")
      this.setWindowName('pages')
    }
  }

  setWindowName(name: string) {
    //打开的新页面
    window.name=name;
  }

  private setToken() {
    this.tokenService.get().subscribe(result => {
      this.token = result.getValue();
    }).unsubscribe();
    return this;
  }
}

