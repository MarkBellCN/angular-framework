import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";

@Component({
  selector: 'app-sys-resource',
  templateUrl: './sys-resource.component.html',
  styleUrls: ['./sys-resource.component.css'],
  providers:[DataTableService]
})
export class SysResourceComponent implements OnInit, OnDestroy {

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
      baseUrl:'/sys/sysResource',
      tableKeyCode:'id',
      initSort:[
        {name:'seq',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"资源名称",field:"name",sortable:true},
        {header:"后台连接地址",field:"url",sortable:true},
        {header:"资源前端路由",field:"path",sortable:true},
        {header:"资源图标",field:"icon",sortable:true},
        {header:"父资源名称",field:"pName",sortable:true},
        {header:"资源类型",field:"resourceType",template:true,sortable:true,format:this.dataTableService.commonEnum.sysResTypeEnum.INPUTDATAS},
        {header:"状态",field:"status",template:true,sortable:true,format:this.dataTableService.commonEnum.statusEnum.INPUTDATAS},
        {header:"排序",field:"seq",sortable:true},
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
