import {Component, EventEmitter, OnInit, Input,Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../framework";
import {DataTableService, QueryInit} from "../../../common";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private _showMessage:boolean = false;
  private _showDetailPage:boolean=false;
  //是否显示消息发送页面
  public _showSendMessage:boolean=false;

  public _sendByCheckData:boolean=false;
  @Output() showMessageChange: EventEmitter<any> = new EventEmitter();

  set showMessage(showMessage:boolean){
    if(showMessage==this._showMessage){
      return;
    }
    this._showMessage=showMessage;
    if(this.showMessage){
      this.messageService.initPageQuery();
      this.messageService.getDataList();
    }
    this.showMessageChange.emit(showMessage);
  }

  @Input() get showMessage(){
    return this._showMessage;
  }

  set showDetailPage(showDetailPage:boolean){
    this._showDetailPage=showDetailPage;
  }

  @Input() get showDetailPage(){
    return this._showDetailPage;
  }

  set showSendMessage(showSendMessage:boolean){
    if(showSendMessage==this._showSendMessage){
      return;
    }
    this._showSendMessage=showSendMessage;
  }

  @Input() get showSendMessage(){
    return this._showSendMessage;
  }

  set sendByCheckData(sendByCheckData:boolean){
    if(sendByCheckData==this._sendByCheckData){
      return;
    }
    this._sendByCheckData=sendByCheckData;
  }

  @Input() get sendByCheckData(){
    return this._sendByCheckData;
  }

  constructor(public acrouter: ActivatedRoute,public messageService: MessageService,
  ) { }

  ngOnInit() {
    //初始化dataTableService需要的参数类型是TableInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/message/simsMessage',
      tableKeyCode:'id',
      pageQueryData: {
        sendTimes: this.messageService.commonEnum.getDefaultTimeRange(),
        mySend: this.messageService.commonEnum.messageSendTypeEnum.SEND.value,
      },
    }
    this.messageService.init(initParams);
  }

  //点击小x关闭信息界面
  closeMessage(){
    this.showMessage = false;
    this.showDetailPage=false;
    this.messageService.checkData={};
  }
  //点击消息列表，弹出消息详情界面
  toShowDetailPage(data:any){
    this.messageService.check(data);
    this.showDetailPage=true;
  }
  //发送消息页面
  toSendMessage(sendByCheckData:boolean){
    this.showSendMessage=true;
    this.sendByCheckData=sendByCheckData;
  }
  toRemoves(str){
    return str.replace(/\\r\\n/g,"");
    
  }



}
