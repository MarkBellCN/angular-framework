/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/5/18
 */
import {Inject, Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {NzMessageService,RestService,UploadFile} from "../framework";
import {CommonEnum} from "./entity";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FileService {
  previewImage = '';
  previewVisible = false;
  constructor(public readonly restService: RestService,
              public readonly messageService: NzMessageService,
              public readonly commonEnum: CommonEnum,) {

  }

  nzCustomRequest = (event): Subscription => {
    event.onProgress();
    let formData = new FormData();
    let paramsJson={uploadReqParams:[]}
    if(event.data){
      formData.append("fileType",event.data.fileType)
      formData.append("filePathType",event.data.filePathType)
    }else{
      formData.append("fileType",this.commonEnum.fileServerInfo.UPLOADDEFAULT.value.fileType)
      formData.append("filePathType",this.commonEnum.fileServerInfo.UPLOADDEFAULT.value.filePathType)
    }
    if(event.name){
      formData.append(event.name,event.file);
    }else{
      formData.append('file',event.file);
    }
    let url=event.action||this.commonEnum.fileServerInfo.FILESERVICEURL.value;
    return this.restService.httpService.requestPost(url+'/upload',formData).subscribe(result=>{
      if(result.code=this.commonEnum.resultEnum.SUCCESS.value){
        event.onSuccess(result.data);
      }else{
        event.onError(result.data);
      }
    });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  getFileInfo(postfix:string){




    return {
      name: postfix,
      status: 'done',
      url: this.commonEnum.fileServerInfo.DOWNLOADURL.value+postfix,
      thumbUrl: this.commonEnum.fileServerInfo.DOWNLOADURL.value+postfix,
    }
  }

  deleteFile = (path):Observable<boolean> => {
    let params=[];
    params.push(path);
    let url=this.commonEnum.fileServerInfo.FILESERVICEURL.value;
    return this.restService.httpService.request('post',url+'/delete',params).map(result=>{
      if(result.code=this.commonEnum.resultEnum.SUCCESS.value){
        return true;
      }
      return false;
    })
  }

  //实现将项目的图片转化成base64
  convertImgToBase64(url, callback, outputFormat?){
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){
      let MAX_HEIGHT = 320;
      if(img.height > MAX_HEIGHT) {
        img.width *= MAX_HEIGHT / img.height;
        img.height = MAX_HEIGHT;
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img,0,0,img.width,img.height);
      var dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
      canvas = null;
    };
    img.src = url;
  }

}
