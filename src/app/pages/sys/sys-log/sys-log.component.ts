import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";

@Component({
  selector: 'app-sys-log',
  templateUrl: './sys-log.component.html',
  styleUrls: ['./sys-log.component.css'],
  providers:[DataTableService]
})

export class SysLogComponent implements OnInit, OnDestroy {
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
      baseUrl:'/sys/sysLog',
      tableKeyCode:'slId',
      initSort:[
        {name:'slTime',value:this.dataTableService.commonEnum.sortEnum.DESCEND.label}
      ],
      pageQueryData: {
        slTimes: this.dataTableService.commonEnum.getDefaultTimeRange(),
      },
      tableFields:[
        {header:"类型",field:"slType",sortable:true},
        {header:"用户",field:"slUser",sortable:true},
        {header:"时间",field:"slTime",sortable:true},
        {header:"来源",field:"slSource",sortable:true},
        {header:"简要说明",field:"slBrief",sortable:true},

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


