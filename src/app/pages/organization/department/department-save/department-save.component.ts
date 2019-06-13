import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {RestService} from "../../../../framework";
import {DataTableService, FileService, DatepickerUtil, DataTreeService,ToTreeData} from "../../../../common";

@Component({
  selector: 'app-department-save',
  templateUrl: './department-save.component.html',
  styleUrls: ['./department-save.component.css'],
  providers:[DataTreeService]
})

export class DepartmentSaveComponent implements OnInit {
  public deptBaseUrl: string = '/organization/department';
  public nodes: any[]=[];
  formModel: FormGroup;
  title: string = "";
  data: any = {};
  desc: string;

  constructor(public service: RestService,
              public fileService: FileService,
              public dataTableService: DataTableService,
              public dataTreeService: DataTreeService,
              private sharedService: SharedService,
              public acrouter: ActivatedRoute,
              public router: Router,) {
  }

  ngOnInit() {
    this.formModel=null;
    this.dataTreeService.init();
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        dptName: ['',Validators.compose([Validators.required]),this.uniqueValidators.bind(this)],
        dptPhone: [''],
        dptRemark: [''],
        dptSuperior: [''],
        dptType: [''],
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
        this.title="查看部门信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑部门信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.title="新增部门信息";
        this.desc=data.desc;
        this.data.dptSuperior=data.data?data.data.dptName:'';
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
    }).unsubscribe();
    this.dataTableService.commonEnum.departmentEnum.observable.subscribe(data=>{
      this.loadNodes(data);
    })
    this.loadNodes();
  }

  loadNodes(data?:any){
    this.nodes=ToTreeData.createTreeNode({source:data||this.dataTableService.commonEnum.departmentEnum.SOURCEDATA,idName:'dptName',pIdName:'dptSuperior',title:'dptName'});
  }

  uniqueValidators(ctrl: AbstractControl): Observable<ValidationErrors|null> {
    if(ctrl.value==null){
      return null;
    }
    return this.dataTableService.restService.detail(ctrl.value,this.deptBaseUrl+'/detail').map(resp => {
      if(this.data!=null&&ctrl.value==this.data['dptName']){
        return null;
      }else if(resp.data!=null&&resp.data['dptName']!=null){
        return {uniqueValidators:true};
      }
      return null;
    });
  }

  

  treeSelect(event,op){
    let data=event.node;
    this.formModel.controls['dptSuperior'].setValue(data.title);
    op.hide()
  }

  overlayPanelClean(op){
    this.formModel.controls['dptSuperior'].setValue("");
    op.hide()
  }

  save(){
    this.dataTableService.nzModalService.confirm({
      title: this.dataTableService.commonEnum.tipTemplateEnum.CONFIRMSAVE.title,
      content: this.dataTableService.commonEnum.tipTemplateEnum.CONFIRMSAVE.content,
      onOk: () => {
        this.saveData()
      },
      onCancel: () => {

      }
    });
  }

  //请求后台保存数据
  private saveData() {
    if (this.desc == this.dataTableService.commonEnum.descEnum.ADD.value) {
      this.dataTableService.restService.add(this.formModel.value, this.deptBaseUrl+'/save').subscribe(result => {
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.dataTableService.messageService.success("数据添加成功！");
          this.dataTableService.commonEnum.initDepartmentEnum();
          this.dataTableService.sidebarClose();
        } else {
          this.dataTableService.messageService.error("数据有误，请重新填写！")
        }
      })
    } else if (this.desc == this.dataTableService.commonEnum.descEnum.UPDATE.value) {
      this.dataTableService.restService.upt(this.formModel.value, this.deptBaseUrl+'/update').subscribe(result => {
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.dataTableService.messageService.success("数据修改成功！");
          this.dataTableService.commonEnum.initDepartmentEnum();
          this.dataTableService.sidebarClose();
        } else {
          this.dataTableService.messageService.error("数据修改失败！");
        }
      })
    }
  }

}
