/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  HttpService,
  SharedService,
  RestService,
  API_URL,
  AISP_URL,
  HTTP_SERVICE,
  FLIGHT_LOGO_PATH,
  FLIGHT_PLANELOGO_PATH,
} from "../framework/common";
import {AuthModule, UserNamePassAuthProvider,} from "../framework/auth";
import {FilePreviewModule} from "./cstm-component/filepreview/filepreview";
import {InputExcelModule} from "./cstm-component/inputexcel/inputexcel";
import {Objectutils} from "./common/objectutils";
const CORE_PROVIDERS = [
  AuthModule.forRoot({
    providers: {
      username: {
        service: UserNamePassAuthProvider,
        config: {
          delay: 500,
          login: {
            rememberMe: true,
          },
        },
      },
    },
  }).providers,
  SharedService,
  HttpService,
  RestService,
  Objectutils,
];


@NgModule({
  exports: [
    AuthModule,
    FilePreviewModule,
    InputExcelModule,
  ],
  imports:[
    FilePreviewModule,
    InputExcelModule,
  ],
})

export class FrameWorkModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FrameWorkModule,
      providers: [
        CORE_PROVIDERS
      ],
    };
  }
}
