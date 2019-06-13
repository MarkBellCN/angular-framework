/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {Inject, Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {
  Headers, Http, JsonpModule, XHRBackend, RequestOptions, RequestOptionsArgs, Jsonp,
  JSONPBackend, URLSearchParams, QueryEncoder, ResponseContentType
} from '@angular/http';
import {NzMessageService} from "../ui-component/components/ng-zorro-antd.module";
export const API_URL: string = 'API_URL';
export const AISP_URL: string = 'MESSAGE_SERVICE_URL';
export const FLIGHT_PLANELOGO_PATH: string = 'FLIGHT_PLANELOGO_PATH';
export const FLIGHT_LOGO_PATH: string = 'FLIGHT_LOGO_PATH';
export const HTTP_SERVICE: string = 'HTTP_SERVICE';
@Injectable()
export class HttpService {
  private _loading;
  /** 是否正在加载中 */
  readonly loading: boolean;
  constructor(private http: HttpClient,private jsonpHttp: Jsonp, public readonly messageService: NzMessageService,) {

  }

  //基本的http application/json请求
  request(method: any, url: any, data?: any): Observable<any> {
    return this.http.request(method, url, {body: data, observe: 'response'}).map((res) => {
      return res;
    })
  }

  //基本的http Post请求
  requestPost(url: any, data?: any): Observable<any> {
    return this.http.post(url, data).map((res) => {
      return res;
    })
  }

  //基本的http Get请求
  requestGet(url: any, data?: any): Observable<any> {
    return this.http.get( url,data).map((res) => {
      return res;
    })
  }

  //基本的http application/json Blob请求
  requestBlob(url: any, data?: any): Observable<any> {
    return this.http.request("post", url, {body: data, observe: 'response', responseType: 'blob'});
  }

  //基本的http Post Blob请求
  requestPostBlob(url: any, data?: any): Observable<any> {
    return this.http.post(url, data,{ observe: 'response',responseType: 'blob'})
  }

  //Blob文件转换下载
  downFile(result, fileName, fileType?) {
    let data = result.body;
    if(data.size<=0){
      this.messageService.remove();
      this.messageService.info("没有数据")
      return;
    }
    var blob = new Blob([data], {type: fileType});
    var objectUrl = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', fileName);
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  //Blob文件转换下载
  downFileByUrl(url, fileName) {
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    a.click();
  }

  private catchError(self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        console.log(res);
      }
      if (res.status === 500 || res.status === 501) {
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
