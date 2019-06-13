/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/6/8
 */
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
} from '@angular/core';
import {HttpService} from "../../common/http.service";
import {Inputexcel} from "./inputexcel";
import {Observable} from "rxjs/Observable";
export interface InputexcelConfigInterface {
  uploadUrl: string;
  failExcelUrl: string;
  templetUrl?: string;
  templetFileName?: string;
  templetFileType?: string;
  maxFileSize?: string;
  inputSuccessCall:(inputSuccessObj:any) => void;
  inputSuccessObj?:any;
  params?: string;
}
@Injectable()
export class InputexcelService {
  private _filePreviewCompFactory: ComponentFactory<Inputexcel>;
  constructor(private _appRef: ApplicationRef,
              public readonly httpService: HttpService,
              private _cfr: ComponentFactoryResolver,) {
    this._filePreviewCompFactory = this._cfr.resolveComponentFactory(Inputexcel);
  }

  private _open(props: InputexcelConfigInterface, factory: ComponentFactory<Inputexcel>) {
    // 在body的内部最前插入一个<inputexcel></inputexcel>方便进行ApplicationRef.bootstrap
    document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);
    // document.body.appendChild(document.createElement(factory.selector));
    let customComponentFactory: ComponentFactory<Inputexcel>;
    let compRef: ComponentRef<Inputexcel>;
    let instance: Inputexcel;

    if (props[ 'nzContent' ] instanceof Type) {
      customComponentFactory = this._cfr.resolveComponentFactory(props[ 'nzContent' ]);
      // 将编译出来的ngmodule中的用户component的factory作为modal内容存入
      props[ 'nzContent' ] = customComponentFactory;
    }
    compRef = this._appRef.bootstrap(factory);
    instance = compRef.instance;
    instance.uploadUrl=props.uploadUrl;
    instance.failExcelUrl=props.failExcelUrl;
    instance.templetUrl=props.templetUrl;
    instance.templetFileName=props.templetFileName;
    instance.templetFileType=props.templetFileType;
    instance.maxFileSize=props.maxFileSize;
    instance.params=props.params;
    instance.inputSuccessCall=props.inputSuccessCall;
    instance.inputSuccessObj=props.inputSuccessObj;
    instance.openUploadDialog();
  }

  show(props: InputexcelConfigInterface) {
    this._open(props, this._filePreviewCompFactory);
  }

}
