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
import {FilePreview} from "./filepreview";
import {HttpService} from "../../common/http.service";
export interface FilePreviewConfigInterface {
  fileUrl?: string;
  fileName?: string;
}
@Injectable()
export class FilePreviewService {
  private _filePreviewCompFactory: ComponentFactory<FilePreview>;
  constructor(private _appRef: ApplicationRef,
              public readonly httpService: HttpService,
              private _cfr: ComponentFactoryResolver,) {
    this._filePreviewCompFactory = this._cfr.resolveComponentFactory(FilePreview);
  }

  private _open(props: FilePreviewConfigInterface, factory: ComponentFactory<FilePreview>) {
    // 在body的内部最前插入一个<ui-file-preview></ui-file-preview>方便进行ApplicationRef.bootstrap
    document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);
    // document.body.appendChild(document.createElement(factory.selector));
    let customComponentFactory: ComponentFactory<FilePreview>;
    let compRef: ComponentRef<FilePreview>;
    let instance: FilePreview;

    if (props[ 'nzContent' ] instanceof Type) {
      customComponentFactory = this._cfr.resolveComponentFactory(props[ 'nzContent' ]);
      // 将编译出来的ngmodule中的用户component的factory作为modal内容存入
      props[ 'nzContent' ] = customComponentFactory;
    }
    compRef = this._appRef.bootstrap(factory);
    instance = compRef.instance;
    instance.show(null,props.fileUrl,props.fileName);
  }

  show(props: FilePreviewConfigInterface) {
    this._open(props, this._filePreviewCompFactory);
  }

  //文件下载
  downFile(fileUrl:string,fileName?:string) {
    if(fileUrl){
      let fileNameByUrl = fileUrl.split("/");
      let httpUrlReg=new RegExp("^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+))?");
      let url=fileUrl.replace(httpUrlReg,"")
      this.httpService.downFileByUrl(url,fileName||fileNameByUrl[fileNameByUrl.length - 1]);
    }
  }

}
