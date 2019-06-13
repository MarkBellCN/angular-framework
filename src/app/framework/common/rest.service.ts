/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {Inject, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {SharedService} from '../../framework/common/shared.service';
import {HttpService, API_URL} from '../../framework/common/http.service';
import {ResponseData} from '../../framework/common/response.data';
@Injectable()
export class RestService {
  private _templetUrl: string;//导入模板下载来链接
  private _baseUrl: string;//项目名下面一级url
  constructor(
              //是服务器的上下文地址，真正的请求地址是 apiUrl+baseUrl+....
              @Inject(API_URL) public readonly apiUrl: string,
              private readonly http: HttpClient,
              private readonly router: Router,
              public readonly httpService: HttpService,
              public readonly sharedService: SharedService,) {
  }

  //私有属性的set get 方法，便于对属性值改变做出处理
  set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set templetUrl(templetUrl: string) {
    this._templetUrl = templetUrl;
  }

  get templetUrl() {
    return this._templetUrl;
  }

  //自定义接口
  restRequest(data: any, customUrl: string): Observable<ResponseData> {
    let url = this.apiUrl + customUrl;
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //列表
  dataList(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/pageQuery';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //新增
  add(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/save';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //批量添加
  btadd(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/batchsave';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //批量修改
  btupt(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/batchupdate';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //修改
  upt(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/update';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //删除
  del(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/delete';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //详情
  detail(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/detail';
    }
    if (typeof data === 'number') {
      data = data.toString();
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //查找所有
  queryAll(data: any, customUrl?: string): Observable<ResponseData> {
    let url: string;
    if (customUrl) {
      url = this.apiUrl + customUrl;
    } else {
      url = this.apiUrl + this.baseUrl + '/queryAll';
    }
    return this.httpService.request('post', url, data).map((res: any) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    })
  }

  //导出
  export(data: any, fileName: string, customUrl?: any, fileType?: any) {
    let url;
    if(customUrl){
      url = this.apiUrl + customUrl;
    }else{
      url = this.apiUrl + this.baseUrl + '/exportExcel';
    }
    this.httpService.requestBlob(url, data).subscribe(result => {
      this.httpService.downFile(result, fileName, fileType || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    })
  }
}
