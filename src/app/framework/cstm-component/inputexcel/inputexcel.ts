import { NgModule,Component,OnInit,Inject,OnDestroy,ElementRef,EventEmitter,Renderer2,ChangeDetectorRef,Input,Output } from '@angular/core';
import {ActivatedRoute,RouterModule, Router} from "@angular/router";
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule,FormBuilder, FormControl, FormGroup, Validators,AbstractControl,ValidationErrors} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RestService, ResultEnum} from "../../../framework/common";
import {NgZorroAntdModule, UploadFile,NzMessageService,NzModalService} from "../../ui-component";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'inputexcel',
  templateUrl: './inputexcel.html',
  styleUrls: ['./inputexcel.css'],
  animations:[
    trigger('showDialogEvent', [
      state('show-dialog', style({
        display: "block"
      })),
      state('hidden-dialog', style({
        display: "none"
      }))
    ])
  ]
})
export class Inputexcel implements OnInit,OnDestroy {
  uploading = false;
  fileList: UploadFile[] = [];
  state:string;
  params:string;
  uploadUrl:string;
  failExcelUrl:string;
  templetUrl:string;
  templetFileName:string;
  templetFileType:string;
  maxFileSize:string='1000000';
  inputSuccessCall:(inputSuccessObj:any) => void;
  inputSuccessObj:any;
  constructor(
    public readonly restService: RestService,
    public readonly acrouter: ActivatedRoute,
    public readonly nzModalService: NzModalService,
    public readonly messageService: NzMessageService,
    public readonly router: Router,
  ) {
    this.restService.sharedService.observable.subscribe(data=>{

    });
  }

  ngOnInit() {
    this.state='hidden-dialog';
  }
  ngOnDestroy() {
    this.params = null;
    this.uploadUrl = null;
    this.templetUrl = null;
    this.templetFileName = null;
    this.templetFileType = null;
  }

  //下载模板
  downLoadTemplet(){
    let url =this.templetUrl||this.restService.templetUrl;
    this.restService.httpService.downFileByUrl(url,this.templetFileName||"导入模板");
  }
  //打开导入对话框
  openUploadDialog(){
    this.state='show-dialog';
    return false;
  }
  //关闭导入对话框
  closeUploadDialog(){
    this.state='hidden-dialog';
    return false;
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  handleUpload(){
    let formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files', file);
    });
    this.uploading = true;
    let url=this.restService.apiUrl+this.uploadUrl;
    this.restService.httpService.requestPost(url,formData).subscribe(result=>{
      if(result.code==ResultEnum.SUCCESS.value){
        this.messageService.success("导入成功！");
        this.closeUploadDialog();
        this.afterUploadLoadData();
      }else{
        let path;
        if(result.data){
          path=result.data.path;
        }
        if(path){
          this.nzModalService.confirm({
            title: '有导入失败数据，是否下载失败数据！',
            content: result.data.msg,
            onOk: () => {
              let formDataError = new FormData();
              formDataError.append("path",path);
              let errorUrl=this.restService.apiUrl+this.failExcelUrl;
              this.restService.httpService.requestPostBlob(errorUrl, formDataError).subscribe(result => {
                this.restService.httpService.downFile(result, '', "application/vnd.ms-excel");
                this.restService.httpService.requestPost(this.restService.apiUrl+'/deleteExcel',formDataError).subscribe(result => {});
              });
              this.closeUploadDialog();
              this.afterUploadLoadData();
            },
            onCancel: () => {
              let formDataError = new FormData();
              formDataError.append("path",path);
              this.restService.httpService.requestPost(this.restService.apiUrl+'/deleteExcel',formDataError).subscribe(result => {});
              this.closeUploadDialog();
              this.afterUploadLoadData();
            }
          });
        }else{
          this.messageService.success(result.msg);
        }
      }
      this.uploading = false;
    }, (err) => {
      this.uploading = false;
    });
  }

  //上传之后回调加载数据
  afterUploadLoadData(){
    if(this.inputSuccessCall&&this.inputSuccessObj){
      this.inputSuccessCall(this.inputSuccessObj);
    }
  }

  //上传成功、失败等状态改变回调函数
  handleChange(info): void{
    if (info.file.response) {

    }
  }
}

@NgModule({
  imports: [CommonModule,RouterModule,FormsModule, ReactiveFormsModule,NgZorroAntdModule],
  declarations: [Inputexcel],
  exports: [Inputexcel],
  entryComponents: [Inputexcel],
})
export class InputExcelModule {}
