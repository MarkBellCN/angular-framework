/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/6/7
 */
import {Inject, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService, PageQuery} from "../../common";
import {CommonEnum, QueryInit, SortItem} from "../../common/entity";
import {NzMessageService, NzModalService, RestService, SharedService, TokenService} from "../../framework";
import {Objectutils} from "../../framework";

@Injectable()
export class MessageService {
  //项目名下面一级url
  private _baseUrl: string;
  //当前活跃的路由，由组件提供
  private _acrouter: ActivatedRoute;
  //sharedService的订阅对象，最后销毁需要取消订阅
  private _sharedServiceSubscription;
  //新增编辑保存按钮是否可用
  private _saveButton = false;
  //表的数据
  private _dataList: Array<any>;
  //总记录数
  private _totalRecords: any;
  //当前查询参数
  private _pageQuery: PageQuery;
  //初始化查询参数
  private _pageQueryData: any;
  //上一次查询参数（分页查询用到上一次的参数）
  private _oldPageQuery: PageQuery;
  //当前选择数据
  public checkData: any = {};
  //所有工作站
  public allWorkSpace:Array<any> = [];
  //实现js查询
  public searchValue:any;
  //表的数据缓存
  private dataListTemp:Array<any>=[];
  //私有属性的set get 方法，便于对属性值改变做出处理
  set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  set pageQuery(pageQuery: PageQuery) {
    this._pageQuery = pageQuery;
  }

  get pageQuery() {
    return this._pageQuery;
  }

  set pageQueryData(pageQueryData: any) {
    this._pageQueryData = pageQueryData;
  }

  get pageQueryData() {
    return this._pageQueryData;
  }

  set sharedServiceSubscription(sharedServiceSubscription: any) {
    this._sharedServiceSubscription = sharedServiceSubscription;
  }

  get sharedServiceSubscription() {
    return this._sharedServiceSubscription;
  }

  set acrouter(acrouter: ActivatedRoute) {
    this._acrouter = acrouter;
  }

  get acrouter() {
    return this._acrouter;
  }

  set oldPageQuery(oldPageQuery: PageQuery) {
    this._oldPageQuery = oldPageQuery;
  }

  get oldPageQuery() {
    return this._oldPageQuery;
  }

  set saveButton(saveButton: boolean) {
    this._saveButton = saveButton;
  }

  get saveButton() {
    return this._saveButton;
  }

  set dataList(dataList: Array<any>) {
    this._dataList = dataList;
  }

  get dataList() {
    return this._dataList;
  }

  set totalRecords(totalRecords: any) {
    this._totalRecords = totalRecords;
  }

  get totalRecords() {
    return this._totalRecords;
  }

  constructor(public readonly restService: RestService,
              public readonly sharedService: SharedService,
              public readonly commonEnum: CommonEnum,
              public readonly nzMessageService: NzMessageService,
              public readonly nzModalService: NzModalService,
              public readonly objectUtils: Objectutils,
              public readonly tokenService: TokenService,
              public readonly router: Router,) {

  }

  //用于初始化数据
  init(queryInit: QueryInit) {
    this.acrouter = queryInit.acrouter;
    this.baseUrl = queryInit.baseUrl;
    this.pageQueryData = queryInit.pageQueryData || {};
    this.initPageQuery();
  }

  //初始化查询参数
  initPageQuery() {
    let pageQuery = new PageQuery({}, 1, this.commonEnum.pageSizeSelectorValues.DEFAULT, new Array<SortItem>());
    if(this.pageQueryData){
      pageQuery.data=JSON.parse(JSON.stringify(this.pageQueryData));
    }
    this.pageQuery = pageQuery;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
  }

  //选择数据
  check(data:any){
    this.checkData=data;
  }

  //查询按钮查询数据
  getDataList() {
    this.pageQuery.pageNum = 1;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
    this.queryMessage();
  }

  //当前页改变事件
  pageIndexChange(event) {
    if (event && event != this.oldPageQuery.pageNum) {
      this.pageQuery.pageNum = event;
      this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
      this.queryMessage();
    }
  }

  //每页显示记录数改变事件
  pageSizeChange(event) {
    if (event && event != this.oldPageQuery.pageSize) {
      this.pageQuery.pageSize = event;
      this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
      this.queryMessage();
    }
  }

  searchData(event){
    if(this.searchValue){
      this.dataList=this.objectUtils.filter(this.dataListTemp,['senderName','title','body'],this.searchValue);
    }else{
      this.dataList=JSON.parse(JSON.stringify(this.dataListTemp));
    }
  }

  //保存按钮启用
  saveButtonEnable() {
    this.saveButton = true;
  }

  //保存按钮禁用
  saveButtonDisable() {
    this.saveButton = false;
  }

  queryAllWorkSpace(){
    this.allWorkSpace=[];
    this.restService.restRequest({},'/basicdata/workspace'+'/queryAll').subscribe(result=>{
      if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
        let woekSpace=result.data;
        woekSpace.forEach(data=>{
          this.commonEnum.messageEnum.INPUTDATAS.forEach(message=>{
            if(message.value==data.type){
              let sendObject:any={};
              sendObject.label=message.label+' '+data.channelNo+' '+data.ip;
              sendObject.value=data.ip;
              this.allWorkSpace.push(sendObject);
            }
          })
        })
      }
    })
  }

  sendMessage(data:any,call?: () => void){
    this.saveButtonDisable();
    this.restService.restRequest(data,this.baseUrl+'/sendMessage').subscribe(result=>{
      if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
        this.queryMessage();
        if(call){
          call();
        }
      }else{
        this.nzMessageService.remove();
        this.nzMessageService.error(result.msg);
      }
      this.saveButtonDisable();
    })
  }

  //查询消息
  private queryMessage(){
    this.dataList = [];
    this.restService.restRequest(this.oldPageQuery,this.baseUrl+'/pageQuery').subscribe(result=>{
      if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
        this.dataList = result.data.rows;
        this.dataListTemp=JSON.parse(JSON.stringify(this.dataList));
        this.totalRecords = result.data.total;
      }
    })
  }
}
