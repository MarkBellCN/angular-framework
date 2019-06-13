import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {DataTableService,ToTreeData} from "../../../../common";

@Component({
  selector: 'app-sys-param-save',
  templateUrl: './sys-param-save.component.html',
  styleUrls: ['./sys-param-save.component.css'],
  providers:[DataTableService]
})

export class SysParamSaveComponent implements OnInit {
  public nodes: any[]=[];
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
    this.dataTableService.saveButtonEnable();
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        sysParamName:['',Validators.compose([Validators.required,]),this.uniqueValidators.bind(this)],
        sysClassify: ['', Validators.required],
        sysParamValue: ['',Validators.required],
        sysRemark: [''],
      }
    );
    this.sharedService.observable.subscribe(data=>{
      if(data.service){
        this.dataTableService=data.service;
      }
      this.dataTableService.saveButtonEnable();
      if(data.desc==this.dataTableService.commonEnum.descEnum.DETAIL.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="查看系统参数信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑系统参数信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }

      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.title="新增系统参数信息";
        this.desc=data.desc;
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
}
