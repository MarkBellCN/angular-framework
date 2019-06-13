import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {DataTableService,ToTreeData,DataTreeService} from "../../../../common";

@Component({
  selector: 'app-sys-resource-save',
  templateUrl: './sys-resource-save.component.html',
  styleUrls: ['./sys-resource-save.component.css'],
  providers:[
    DataTreeService
  ]
})
export class SysResourceSaveComponent implements OnInit {
  public nodes: any[]=[];
  formModel: FormGroup;
  title: string = "";
  data: any = {};
  desc: string;
  constructor(public dataTableService: DataTableService,
              private sharedService: SharedService,
              public dataTreeService: DataTreeService,
              public acrouter: ActivatedRoute,
              public router: Router,) {
  }

  ngOnInit() {
    this.dataTreeService.init();
    this.formModel=null;
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        id:[''],
        name: ['', Validators.required],
        pName: [''],
        url:[''],
        icon:[''],
        resourceType:[''],
        status: ['', Validators.required],
        seq:[''],
        pid:[''],
        path:['']
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
        this.title="查看资源";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑资源";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
        this.dataTreeService.selectedKeysDefault.push(this.data.pid)
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.title="新增资源";
        this.desc=data.desc;
        this.data.status=this.dataTableService.commonEnum.statusEnum.ENABLE.value;
        this.data.resourceType=this.dataTableService.commonEnum.sysResTypeEnum.MENU.value;
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
    }).unsubscribe();

    this.dataTableService.restService.queryAll({}).subscribe(result=>{
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.nodes=ToTreeData.createTreeNode({source:result.data,idName:'id',pIdName:'pid',title:'name'});
      }
    })
  }

  treeSelect(event,op){
    let data=event.node;
    this.formModel.controls['pid'].setValue(data.key);
    this.formModel.controls['pName'].setValue(data.title);
    op.hide()
  }

  overlayPanelClean(op){
    this.formModel.controls['pName'].setValue("");
    this.formModel.controls['pid'].setValue("");
    op.hide()
  }
}
