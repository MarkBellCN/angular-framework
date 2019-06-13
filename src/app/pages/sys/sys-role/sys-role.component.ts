import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.css'],
  providers:[DataTableService]
})
export class SysRoleComponent implements OnInit, OnDestroy {
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
      baseUrl:'/sys/sysRole',
      tableKeyCode:'id',
      initSort:[
        {name:'name',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"角色名称",field:"name",sortable:true},
        {header:"角色描述",field:"description",sortable:true,style:{'max-width':'249px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header:"状态",field:"status",template:true,sortable:true,format:this.dataTableService.commonEnum.statusEnum.INPUTDATAS},
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
