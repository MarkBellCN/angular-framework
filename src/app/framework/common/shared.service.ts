/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
export interface SendData{
  desc:string,
  data:any,
  service?:any,
  sourceComponent?:any,
  targetComponent?:any,
}

/**
 * 共享服务，用来处理组件间通讯
 */
@Injectable()
export class SharedService {

  private subject = new BehaviorSubject<any>(1);

  get observable(){
    return this.subject.asObservable();
  }
  //发送数据
  send(data:SendData){
    this.subject.next(data);
  }
}
