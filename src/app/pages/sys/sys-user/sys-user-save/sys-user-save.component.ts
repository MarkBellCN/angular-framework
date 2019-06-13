import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {DataTableService, ToTreeData} from "../../../../common";

@Component({
  selector: 'app-sys-user-save',
  templateUrl: './sys-user-save.component.html',
  styleUrls: ['./sys-user-save.component.css'],
  providers:[DataTableService]
})
export class SysUserSaveComponent implements OnInit {
  //所有角色信息
  enableAllRole:Array<any>;
  //当前用户的角色信息
  currUserRole:Array<any>;
  formModel: FormGroup;
  title: string = "";
  data: any = {};
  desc: string;
  constructor(public dataTableService: DataTableService,
              private sharedService: SharedService,
              public acrouter: ActivatedRoute,
              public router: Router,) {
  }

  ngOnInit() {
    this.formModel=null;
    let fb = new FormBuilder();
    let noPassword={
      id:[''],
      userName:['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,8}$/)])],
      loginName:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/)]),this.uniqueValidators.bind(this)],
      sex:[''],
      roleIds:[''],
      status:['',Validators.required]
    }
    let hasPassword={
      id:[''],
      userName:['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,8}$/)])],
      loginName:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/)]),this.uniqueValidators.bind(this)],
      sex:[''],
      password:['',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9]{6,18}$/)])],
      roleIds:[''],
      status:['',Validators.required]
    }
    this.sharedService.observable.subscribe(data=>{
      if(data.service){
        this.dataTableService=data.service;
      }
      this.dataTableService.saveButtonEnable();
      if(data.desc==this.dataTableService.commonEnum.descEnum.DETAIL.value){
        this.formModel = fb.group(
          noPassword
        );
        this.data=data.data;
        this.desc=data.desc;
        this.title="查看用户";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.formModel = fb.group(
          noPassword
        );
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑用户";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.formModel = fb.group(
          hasPassword
        );
        this.title="新增用户";
        this.desc=data.desc;
        this.data.sex=this.dataTableService.commonEnum.sexEnum.MALE.value;
        this.data.status=this.dataTableService.commonEnum.statusEnum.ENABLE.value;
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
    }).unsubscribe();

    //查询用户角色
    //定义url，如果不在同一个页面就要自己拼接url地址； 请求自定义接口，存入内容，在页面遍历
    let url=this.dataTableService.restService.baseUrl+'/queryRoleByUser';
    this.dataTableService.restService.restRequest({userId:this.data.id}||{},url).subscribe(result=>{
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.enableAllRole=result.data.enableAllRole;
        if(result.data.currUserRole){
          this.currUserRole=[]
          let currUserRoleIds=[]
          result.data.currUserRole.forEach(role=>{
            this.currUserRole.push({value:role.id,label:role.name})
            currUserRoleIds.push(role.id);
          })
          this.formModel.controls['roleIds'].setValue(currUserRoleIds);
        }
      }
    })
  }

  uniqueValidators(ctrl: AbstractControl): Observable<ValidationErrors|null> {
    if(ctrl.value==null){
      return null;
    }
    let url=this.dataTableService.restService.baseUrl+'/queryByLoginName'
    return this.dataTableService.restService.restRequest(ctrl.value||{},url).map(resp => {
      if(this.data!=null&&ctrl.value==this.data['loginName']){
        return null;
      }else if(resp.data!=null&&resp.data['loginName']!=null){
        return {uniqueValidators:true};
      }
      return null;
    });
  }

}
