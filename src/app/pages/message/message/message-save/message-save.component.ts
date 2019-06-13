import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {DataTableService} from "../../../../common/data.table.service";
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-message-save',
  templateUrl: './message-save.component.html',
  styleUrls: ['./message-save.component.css']
})
export class MessageSaveComponent implements OnInit {
  //当前用户的角色信息
  currReceiveips:Array<any>;
  formModel: FormGroup;
  //发送消息发送对象是否根据当前选择数据自动选中
  private _sendByCheckData:boolean=false;
  private _showSendMessage:boolean=false;
  @Output() showSendMessageChange: EventEmitter<any> = new EventEmitter();
  @Output() sendByCheckDataChange: EventEmitter<any> = new EventEmitter();
  set showSendMessage(showSendMessage:boolean){
    if(showSendMessage==this._showSendMessage){
      return;
    }
    this._showSendMessage=showSendMessage;
    if(this.showSendMessage){
      this.messageService.saveButtonEnable();
      this.messageService.queryAllWorkSpace();
      this.initFormModelValue();
    }
    this.showSendMessageChange.emit(showSendMessage);
  }

  @Input() get showSendMessage(){
    return this._showSendMessage;
  }

  set sendByCheckData(sendByCheckData:boolean){
    if(sendByCheckData==this._sendByCheckData){
      return;
    }
    this._sendByCheckData=sendByCheckData;
    if(this.sendByCheckData){
      if(this.messageService.checkData){
        this.currReceiveips=this.messageService.checkData.receiveips;
        this.formModel.controls['receiveips'].setValue(this.currReceiveips);
      }
    }
    this.sendByCheckDataChange.emit(sendByCheckData);
  }

  @Input() get sendByCheckData(){
    return this._sendByCheckData;
  }

  constructor(
    public dataTableService: DataTableService,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.formModel=null;
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        receiveips: [''],
        title: ['', Validators.compose([Validators.required])],
        body:['', Validators.compose([Validators.required])],
      }
    );
  }

  initFormModelValue(){
    this.formModel.controls['receiveips'].setValue('');
    this.formModel.controls['title'].setValue('');
    this.formModel.controls['body'].setValue('');
  }

  sendMessage(){
    if(!this.formModel.value['receiveips']||this.formModel.value['receiveips'].length==0){
      this.messageService.nzMessageService.remove();
      this.messageService.nzMessageService.error("请选择发送对象！！！")
      return;
    }
    this.messageService.sendMessage(this.formModel.value,()=>{
      this.closeSendMessage();
    });
  }

  closeSendMessage(){
    this.showSendMessage=false;
    this.sendByCheckData=false;
    this.sendByCheckData=false;
    this.initFormModelValue();
    this.currReceiveips=[];
  }






}
