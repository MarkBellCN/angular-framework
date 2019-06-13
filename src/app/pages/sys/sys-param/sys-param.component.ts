import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";

@Component({
  selector: 'app-sys-param',
  templateUrl: './sys-param.component.html',
  styleUrls: ['./sys-param.component.css'],
  providers:[DataTableService]
})

export class SysParamComponent implements OnInit, OnDestroy {
  constructor(public acrouter: ActivatedRoute, public dataTableService: DataTableService,) {

  }
  ngOnInit() {
    //初始化dataTableService需要的参数类型是TableInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/sys/sysParam',
      tableKeyCode:'sysParamName',
      initSort:[
        {name:'sysParamName',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"参数名称",field:"sysParamName",sortable:true},
        {header:"参数分类",field:"sysClassify",sortable:true},
        {header:"参数值",field:"sysParamValue",sortable:true},
        {header:"备注",field:"sysRemark",sortable:false,style:{'max-width':'249px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
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

