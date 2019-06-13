import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {RestService} from "../../../../framework";
import {DataTableService, FileService, DatepickerUtil, DataTreeService, FaceService} from '../../../../common';
import {ResponseData} from '../../../../framework/common/response.data';

@Component({
  selector: 'app-employee-save',
  templateUrl: './employee-save.component.html',
  styleUrls: ['./employee-save.component.css'],
  providers:[DataTableService],
})

export class EmployeeSaveComponent implements OnInit {
  currempPost:Array<any>;
  currempTeam:Array<any>;
  datepickerUtil: DatepickerUtil;
  fileList=[];
  formModel: FormGroup;
  title: string = "";
  data: any = {};
  desc: string;
  //证件信息列表
  public maxCardCount=0;
  public siCardInfos:Array<any>=[];

  constructor(public service: RestService,
              public fileService: FileService,
              public faceService: FaceService,
              public dataTableService: DataTableService,
              private sharedService: SharedService,
              public acrouter: ActivatedRoute,
              public router: Router,) {
  }

  ngOnInit() {
    this.datepickerUtil=new DatepickerUtil();
    this.formModel=null;
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        empNo: ['',Validators.compose([Validators.required]),this.uniqueValidators.bind(this)],
        empDepartment: ['',Validators.compose([Validators.required])],
        empName: ['',Validators.compose([Validators.required])],
        empGender: [''],
        empPost: [''],
        empTeam: [''],
        empIdcardno: [''],
        empCardid: [''],
        empPoliticalFace: [''],
        empDuty: [''],
        empPhoto: [''],
        empType: [''],
        empRank: [''],
        empMobilephone: [''],
        empOfficephone: [''],
        empHomephone: [''],
        empRemark: [''],
      }
    );
    this.sharedService.observable.subscribe(data=>{
      if(data.service){
        this.dataTableService=data.service;
      }
      this.dataTableService.saveButtonEnable();
      if(data.desc==this.dataTableService.commonEnum.descEnum.DETAIL.value){
        this.getEmppostInfo(data.data);
        this.getEmpteamInfo(data.data);
        this.data=data.data;
        this.desc=data.desc;
        this.title="查看员工信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
        if(this.data['empPhoto']&&this.data['empPhoto']!=''){
          this.fileList.push(this.fileService.getFileInfo(this.data['empPhoto']));
        }

      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.getEmppostInfo(data.data);
        this.getEmpteamInfo(data.data);
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑员工信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
        if(this.data['empPhoto']&&this.data['empPhoto']!=''){
          this.fileList.push(this.fileService.getFileInfo(this.data['empPhoto']));
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.title="新增员工信息";
        this.desc=data.desc;
        // this.data.arptAttr=this.dataTableService.commonEnum.airportAttrEnum.HOME.value;
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }

      }
    }).unsubscribe();
  }

  uniqueValidators(ctrl: AbstractControl): Observable<ValidationErrors|null> {
    if(ctrl.value==null){
      return null;
    }
    return this.dataTableService.restService.detail(ctrl.value).map(resp => {
      if(this.data!=null&&ctrl.value==this.data[this.dataTableService.tableKeyCode]){
        return null;
      }else if(resp.data!=null&&resp.data[this.dataTableService.tableKeyCode]!=null){
        return {uniqueValidators:true};
      }
      return null;
    });
  }

  save(){
    this.dataTableService.save(this.formModel.value,this.desc,null,null,()=>{
      if(this.data.empCardid){
        //删除该卡号对应的人脸库
        this.faceService.deleteFace(this.data);
      }
      //上传员工人脸信息
      if(this.fileList.length>0){
        let file=this.fileList[0];
        let employee=JSON.parse(JSON.stringify(this.formModel.value));
        let base64SplitReg = /^data:image\/(jpeg|png|gif);base64,/;
        employee.empPhoto=file.thumbUrl
        if(base64SplitReg.exec(employee.empPhoto)){
          employee.empPhoto=employee.empPhoto.replace(base64SplitReg,"");
          this.faceService.uploadFacePlus(employee)
        }else{
          let urlArr=this.dataTableService.commonEnum.fileServerInfo.DOWNLOADURL.value.split("/");
          let urlContent=urlArr[urlArr.length-2]
          this.fileService.convertImgToBase64(urlContent+"/"+this.formModel.value.empPhoto,(data)=>{
            employee.empPhoto=data;
            employee.empPhoto=employee.empPhoto.replace(base64SplitReg,"");
            this.faceService.uploadFacePlus(employee)
          })
        }
      }
    });
  }

  //上传图片成功、失败等状态改变回调函数
  handleChange(info): void{
    if(info.file.status=='removed'){
      this.fileService.deleteFile(this.formModel.value.empPhoto).subscribe(result=>{
        if(result){
          this.formModel.controls['empPhoto'].setValue('');
          this.faceService.deleteFace(this.formModel.value)
        }
      });
    }else if (info.file.response) {
      this.formModel.controls['empPhoto'].setValue(info.file.response[0]);
    }
  }

  //根据员工编号查询员工的详细信息
  getEmppostInfo(data){
    let url = '/organization/employee/queryPostByEmpNo';
    this.dataTableService.restService.restRequest(data||{},url).subscribe(result=>{
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.currempPost = [];
        if(result.data&&result.data.length){
          result.data.forEach(item=>{
            this.currempPost.push(item.postName);
          })
        }
      }
    })
  }
  //根据员工编号查询员工的详细信息
  getEmpteamInfo(data){
    let url = '/organization/employee/queryTeamByEmpNo';
    this.dataTableService.restService.restRequest(data||{},url).subscribe(result=>{
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.currempTeam = [];
        if(result.data&&result.data.length){
          result.data.forEach(item=>{
            this.currempTeam.push(item.teamNo);
          })
        }
      }
    })
  }

}
