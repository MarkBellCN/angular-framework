import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../framework";
import {DataTableService, TableField, QueryInit, DatepickerUtil} from "../../../common";
@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css'],
  providers:[DataTableService]
})
export class PassengerComponent implements OnInit {

  isShowInfo: boolean = true;// 控制右边侧栏显示隐藏
  public currentDataList: any ={};  //存储当前旅客详情

  constructor(
    public sharedService: SharedService,
    public acrouter: ActivatedRoute,
    public dataTableService: DataTableService,) {

  }

  ngOnInit() {
    //初始化dataTableService需要的参数类型是TableInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams: QueryInit = {
      acrouter: this.acrouter,
      baseUrl: '/infosearch/passenger',
      tableKeyCode: 'psgId',
      initSort: [
        {name: 'psgFltdt', value: this.dataTableService.commonEnum.sortEnum.DESCEND.label}
      ],
      pageQueryData: {
        fltdts: this.dataTableService.commonEnum.getDefaultTimeRange(),
        dfTerminal: this.dataTableService.commonEnum.terminalListEnum.DEFAULT,
      },
      tableFields: [
        {header: "航站楼", field: "dfTerminal", sortable: true},
        {header: "航班号", field: "psgFltno", sortable: true},
        {header: "航班日期", field: "psgFltdt", sortable: true},
        {header: "登机号", field: "psgBoardno", sortable: true},
        {header: "座位号", field: "psgSeatno", sortable: true},
        {header: "验证时间", field: "psgVerifyTime", sortable: true,style:{'max-width':'200px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header: "旅客姓名", field: "psgNameCh", sortable: true,style:{'max-width':'200px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header: "证件号", field: "psgIdcardNo", sortable: true,style:{'max-width':'200px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header: "性别", field: "psgGender",template:true, hidden: false,sortable: true,format:this.dataTableService.commonEnum.genderEnum.INPUTDATAS},
        {header: "始发站", field: "psgOrigin", sortable: true},
        {header: "目的站", field: "psgDest", sortable: true},

      ],
      lazyLoadDataListCall:()=>{
        if(this.dataTableService.dataList&&this.dataTableService.dataList.length>0){
          this.dataTableService.dataList[0].checked=true;
          this.currentDataList = this.dataTableService.dataList[0];
        }
      }
    }
    //初始化方法，始化查询参数、初始化排序然后调用restServcie.dataList向后台请求列表数据
    this.dataTableService.init(initParams);
    this.dataTableService.sharedServiceSubscription = this.dataTableService.sharedService.observable.subscribe(data => {
      if(data.desc=="keyEventSelectDataUp"){
        this.dataTableService.keyEventSelectDataUp(this.dataTableService.getCurrSelectData(),(data)=>{
          this.toInfoPage(data);
        })
      }else if(data.desc=="keyEventSelectDataDown"){
        this.dataTableService.keyEventSelectDataDown(this.dataTableService.getCurrSelectData(),(data)=>{
          this.toInfoPage(data);
        })
      }
    })
  }

  //点击按钮切换右边详情的显示和隐藏
  toSwitchInfo(){
    this.isShowInfo = !this.isShowInfo;
  }

  //右边详情页
  toInfoPage(data:any){
    if(!data){
      return;
    }
    this.isShowInfo = true;
    // data为类表界面传过来的旅客信息，赋值给当前旅客详情
    this.dataTableService.dataMultiCheckService.checkOne(data);
    this.currentDataList = data;

  }

  ngOnDestroy() {
    if (this.dataTableService.sharedServiceSubscription) {
      this.dataTableService.sharedServiceSubscription.unsubscribe();
    }
  }

}
