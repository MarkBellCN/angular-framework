import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService,TableField,QueryInit} from "../../../common";

@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.css'],
  providers:[DataTableService]
})
export class SysUserComponent implements OnInit,OnDestroy {

  constructor(public acrouter: ActivatedRoute, public dataTableService: DataTableService,private router: Router,) {

  }

  ngOnInit() {
    //初始化dataTableService需要的参数类型是TableInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/sys/sysUser',
      tableKeyCode:'id',
      initSort:[
        {name:'createTime',value:this.dataTableService.commonEnum.sortEnum.DESCEND.label}
      ],
      tableFields:[
        {header:"登录名称",field:"loginName",sortable:true},
        {header:"用户名",field:"userName",sortable:true},
        {header:"性别",field:"sex",template:true,sortable:true,format:this.dataTableService.commonEnum.sexEnum.INPUTDATAS},
        {header:"状态",field:"status",template:true,sortable:true,format:this.dataTableService.commonEnum.statusEnum.INPUTDATAS},
        {header:"创建时间",field:"createTime",sortable:true},
      ]
    }
    //初始化方法，始化查询参数、初始化排序然后调用restServcie.dataList向后台请求列表数据
    this.dataTableService.init(initParams);

    this.dataTableService.sharedServiceSubscription=this.dataTableService.sharedService.observable.subscribe(data=>{

    })
  }

  /**
   * 重置密码
   */
  toResetPsdPage(data:any) {
    this.router.navigate([{outlets: {reset: ['uptpsd']}}], {skipLocationChange: true});
    this.dataTableService.sharedService.send({desc: this.dataTableService.commonEnum.descEnum.RESETPSD.value, data: data});
  }

  ngOnDestroy() {
    if(this.dataTableService.sharedServiceSubscription){
      this.dataTableService.sharedServiceSubscription.unsubscribe();
    }
  }

}
