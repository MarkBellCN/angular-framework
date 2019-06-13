/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JsonpModule} from '@angular/http';
import 'rxjs/Rx';
import {
  DataTableService,
  DataMultiCheckService,
  MenuService,
  MenuInternalService,
  FileService,
  FaceService,
  WebSocketService,
  RouteInterceptService,
  CommonEnum,
} from "./common";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UpdPsdModule} from './pages/uptpsd/updpsd.component';
import {
  FrameWorkModule,
  NgZorroAntdModule,
  FilePreviewService,
  InputexcelService,
  NZ_MESSAGE_CONFIG,
  NZ_NOTIFICATION_CONFIG,
  NZ_LOGGER_STATE,
  NZ_LOCALE,
  NZ_I18N,
  zh_CN,
  zhCN
} from './framework';
import {
  AISP_URL,
  API_URL,
  FLIGHT_LOGO_PATH,
  FLIGHT_PLANELOGO_PATH,
  HTTP_SERVICE,
  HttpService
} from "./framework/common";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    JsonpModule,
    UpdPsdModule,
    FrameWorkModule.forRoot(),
    NgZorroAntdModule.forRoot(),
  ],
  providers: [
    DataTableService,
    DataMultiCheckService,
    WebSocketService,
    FilePreviewService,
    InputexcelService,
    CommonEnum,
    Title,
    MenuService,
    FileService,
    FaceService,
    MenuInternalService,
    RouteInterceptService,
    {provide: HTTP_SERVICE, useClass: HttpService},
    {provide: API_URL, useValue: '/sims/management'},
    {provide: AISP_URL, useValue: '/aisp'},
    {provide: FLIGHT_LOGO_PATH, useValue: '/assets/img/airline/'},
    {provide: FLIGHT_PLANELOGO_PATH, useValue: '/assets/img/logo_plane/'},
    {provide: 'APP_NAME', useValue: '安检系统管理平台'},
    {provide: 'APP_VERSION', useValue: '4.2.0.1'},
    {provide: 'CONFIRM_QUERY', useValue: true},
    {provide: NZ_LOGGER_STATE, useValue: false},
    {provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 1000}},
    {provide: NZ_NOTIFICATION_CONFIG, useValue: {nzTop: '20px'}},
    {provide: NZ_LOCALE, useValue: zhCN},
    {provide: NZ_I18N, useValue: zh_CN},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
