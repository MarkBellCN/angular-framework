import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";
@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css'],
  providers:[DataTableService]
})
export class AirportComponent implements OnInit, OnDestroy {

  constructor(public acrouter: ActivatedRoute, public dataTableService: DataTableService,) {

  }

  ngOnInit() {
    //初始化dataTableService需要的参数类型是QueryInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/basicdata/airport',
      tableKeyCode:'arptCode3',
      initSort:[
        {name:'arptCode3',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"三字码",field:"arptCode3",sortable:true},
        {header:"中文简称",field:"arptBriefCh",sortable:true},
        {header:"英文简称",field:"arptBriefEn",sortable:true},
        {header:"所在城市",field:"arptCity",sortable:true},
        {header:"中文名称",field:"arptNameCh",sortable:true},
        {header:"英文名称",field:"arptNameEn",sortable:true},
        {header:"属性",field:"arptAttr",template:true,sortable:true,format:this.dataTableService.commonEnum.airportAttrEnum.INPUTDATAS},
      ],
      operateDataCall:()=>{
        this.dataTableService.commonEnum.initAirportListEnum();
      }
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
