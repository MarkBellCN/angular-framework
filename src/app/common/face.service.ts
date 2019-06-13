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
import {ResponseData} from '../framework/common/response.data';

@Injectable()
export class FaceService {
  previewImage = '';
  previewVisible = false;
  constructor(public readonly restService: RestService,
              public readonly messageService: NzMessageService,
              public readonly commonEnum: CommonEnum,) {

  }
  uploadFacePlus(data){
    let url="/faceplus/photo/addPhotoByEmployee";
    this.restService.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    }).subscribe(result=>{
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        this.messageService.info("人脸信息构建成功");
      }

    })
  }

  deleteFace(data){
    let url="/faceplus/photo/delPhotoByEmployee";
    this.restService.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    }).subscribe(result=>{
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        this.messageService.info("人脸信息删除成功");
      }
    })
  }
}
