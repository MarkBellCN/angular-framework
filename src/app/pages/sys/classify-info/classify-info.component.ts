import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";
import {CtclassifyEnum} from '../../../common/entity/common.enum';

@Component({
  selector: 'app-classify-info',
  templateUrl: './classify-info.component.html',
  styleUrls: ['./classify-info.component.css'],
  providers:[DataTableService]
})
export class ClassifyInfoComponent implements OnInit {

  constructor(public acrouter: ActivatedRoute, public dataTableService: DataTableService,) { }

  ngOnInit() {
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/sys/classifyInfo',
      tableKeyCode:'ciName',
      initSort:[
        {name:'ciName',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"类别",field:"ciClassify",template:true,sortable:true,format:this.dataTableService.commonEnum.ctclassifyEnum.INPUTDATAS},
        {header:"编码",field:"ciCode",sortable:true},
        {header:"名称",field:"ciName",sortable:true},
        {header:"排序码",field:"ciOrdNo",sortable:true},
      ]
    }
    //初始化方法，始化查询参数、初始化排序然后调用restServcie.dataList向后台请求列表数据
    this.dataTableService.init(initParams);

    this.dataTableService.sharedServiceSubscription=this.dataTableService.sharedService.observable.subscribe(data=>{

    })
  }

  ngOnDestroy() {
    if(this.dataTableService.sharedServiceSubscription){
      this.dataTableService.sharedServiceSubscription.unsubscribe();
    }
  }

}
