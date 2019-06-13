/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {Inject, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  RestService,
  SharedService,
  NzMessageService,
  AuthService,
  PermissionService,
  NzModalService, InputexcelService
} from "../framework";
import {PageQuery, TableField, CommonEnum, QueryInit, SortItem} from "../common/entity";
import {DataMultiCheckService} from "./data.multi.check.service";
import {Observable} from "rxjs/Observable";
import {UploadFile} from "../framework/ui-component/components/upload/interface";
import {FileService} from "./file.service";
import {FilePreviewService} from "../framework/cstm-component/filepreview/filepreview.service";
import {DatepickerUtil} from "./datepicker.util";
import {StatRangeEnum} from "./entity/common.enum";
import {D} from "@angular/core/src/render3";
import {LoggerService} from "../framework/ui-component/components/util/logger";

@Injectable()
export class DataTableService {
  //当前活跃的路由，由组件提供
  private _acrouter: ActivatedRoute;
  //sharedService的订阅对象，最后销毁需要取消订阅
  private _sharedServiceSubscription;
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
  //最后更新时间
  public lastLoadTime: Date = new Date();
  //表的主键
  private _tableKeyCode: string;
  //初始化排序字段
  private _initSort: SortItem[];
  //确认唯一数据的字段，多个用逗号分隔，如果没有则取tableKeyCode(为了兼容原有代码)
  private _fieldUniqueData: string;
  //表列的字段
  private _tableFields: Array<TableField>;
  //新增编辑详情等侧边栏是否显示
  private _visibleSidebar = false;
  //侧边栏显示时是否显示遮罩
  private _sidebarMask = false;
  //新增编辑保存按钮是否可用
  private _saveButton = false;
  //是否显示正在加载动画
  private _loadlogo: boolean = true;
  //是否键盘翻页
  private stopChangePageQuery: boolean=false;
  //是否自动刷新
  public refreshable = false;
  //自动刷新开关
  public refreshswitch = false;
  //自动刷新定时器
  public refreshInterval;
  //自动刷新定时器时间间隔
  public refreshTimer;
  //正在加载数据
  public loading: boolean = true;
  //权限
  public permissionObj: any;
  //用于标记搜索条件是否可见
  public isSchRangeOpen;
  //懒加载回调函数
  public lazyLoadDataListCall: (dataList:any) => void;
  //保存、删除数据回调函数
  public operateDataCall: (data:any) => void;
  //私有属性的set get 方法，便于对属性值改变做出处理
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

  set oldPageQuery(oldPageQuery: PageQuery) {
    this._oldPageQuery = oldPageQuery;
  }

  get oldPageQuery() {
    return this._oldPageQuery;
  }

  set tableFields(tableFields: Array<TableField>) {
    this._tableFields = tableFields;
  }

  get tableFields() {
    return this._tableFields;
  }

  get showTableFields() {
    let tableFields: Array<TableField> = new Array();
    if (this.tableFields && this.tableFields.length > 0) {
      this.tableFields.forEach(tableField => {
        if (!tableField.hidden) {
          tableFields.push(tableField);
        }
      })
    }
    return tableFields;
  }

  set tableKeyCode(tableKeyCode: string) {
    this._tableKeyCode = tableKeyCode;
  }

  get tableKeyCode() {
    return this._tableKeyCode;
  }

  set initSort(initSort: Array<SortItem>) {
    this._initSort = initSort;
  }

  get initSort() {
    return this._initSort;
  }

  set fieldUniqueData(fieldUniqueData: string) {
    this._fieldUniqueData = fieldUniqueData;
  }

  get fieldUniqueData() {
    return this._fieldUniqueData;
  }

  set dataList(dataList: Array<any>) {
    this._dataList = dataList;
  }

  get dataList() {
    return this._dataList;
  }

  set selectedDataList(selectedDataList: Array<any>) {
    this.dataMultiCheckService.checkDatas = selectedDataList;
  }

  get selectedDataList() {
    return this.dataMultiCheckService.checkDatas;
  }

  set totalRecords(totalRecords: any) {
    this._totalRecords = totalRecords;
  }

  get totalRecords() {
    return this._totalRecords;
  }

  set sharedServiceSubscription(sharedServiceSubscription: any) {
    this._sharedServiceSubscription = sharedServiceSubscription;
  }

  get sharedServiceSubscription() {
    return this._sharedServiceSubscription;
  }

  set visibleSidebar(visibleSidebar: boolean) {
    this._visibleSidebar = visibleSidebar;
  }

  get visibleSidebar() {
    return this._visibleSidebar;
  }

  set sidebarMask(sidebarMask: boolean) {
    this._sidebarMask = sidebarMask;
  }

  get sidebarMask() {
    return this._sidebarMask;
  }

  set saveButton(saveButton: boolean) {
    this._saveButton = saveButton;
  }

  get loadlogo() {
    return this._loadlogo;
  }

  set loadlogo(loadlogo: boolean) {
    this._loadlogo = loadlogo;
  }

  get saveButton() {
    return this._saveButton;
  }

  set acrouter(acrouter: ActivatedRoute) {
    this._acrouter = acrouter;
  }

  get acrouter() {
    return this._acrouter;
  }

  constructor(
              @Inject('CONFIRM_QUERY') public readonly CONFIRM_QUERY: boolean,
              public readonly restService: RestService,
              public readonly sharedService: SharedService,
              public readonly commonEnum: CommonEnum,
              public readonly messageService: NzMessageService,
              public readonly inputexcelService: InputexcelService,
              public readonly nzModalService: NzModalService,
              public readonly loggerService: LoggerService,
              public readonly authService: AuthService,
              public readonly permissionService: PermissionService,
              public readonly dataMultiCheckService: DataMultiCheckService,
              public readonly filePreviewService: FilePreviewService,
              public readonly router: Router,) {

    this.sharedService.observable.subscribe(data=>{
      if(data.desc=='HttpErrorResponse'){
        this.loggerService.info("请求超时");
        this.loading=false;
      }
    });

  }

  //用于初始化数据
  init(queryInit: QueryInit) {
    this.permissionObj = {};
    this.permissionObj = this.permissionService.getQx(queryInit.baseUrl);
    this.acrouter = queryInit.acrouter;
    this.restService.baseUrl = queryInit.baseUrl;
    this.restService.templetUrl = queryInit.templetUrl;
    this.totalRecords = null;
    if (queryInit.loadlogo != null) {
      this.loadlogo = queryInit.loadlogo;
    }
    this.isSchRangeOpen = queryInit.isSchRangeOpen || false;
    this.tableKeyCode = queryInit.tableKeyCode;
    this.initSort = queryInit.initSort;
    this.fieldUniqueData = queryInit.fieldUniqueData;
    this.selectedDataList = queryInit.selectedDataList || [];
    this.dataList = queryInit.dataList || [];
    this.tableFields = queryInit.tableFields || [];
    this.visibleSidebar = queryInit.visibleSidebar || false;
    this.sidebarMask = queryInit.sidebarMask || false;
    this.pageQueryData = queryInit.pageQueryData || {};
    this.lazyLoadDataListCall = queryInit.lazyLoadDataListCall;
    this.operateDataCall=queryInit.operateDataCall;
    if (queryInit.isRefreshable == true) {
      this.refreshable = true;
    } else {
      this.refreshable = false;
    }
    this.autoRefreshClose();
    if (queryInit.isRefreshswitch == true) {
      this.refreshswitch = true;
    } else {
      this.refreshswitch = false;
    }
    this.initPageQuery(true);
  }

  //获取总页数
  getPageTotal() {
    return Math.ceil(this.totalRecords / this.pageQuery.pageSize);
  }

  //初始化查询参数
  initPageQuery(init?: boolean) {
    if (init) {
      this.pageQuery = null;
    }
    let pageQuery = new PageQuery({}, 1, this.commonEnum.pageSizeSelectorValues.DEFAULT, new Array<SortItem>());
    if (this.pageQueryData) {
      for(let key in this.pageQueryData){
        if(this.pageQueryData[key] instanceof Array){
          let isDate=false;
          this.pageQueryData[key].forEach(data=>{
            if(data instanceof Date){
              isDate=true;
            }
          })
          if(isDate){
            this.pageQueryData[key]=this.commonEnum.getDefaultTimeRange();
          }
        }else if(this.pageQueryData[key] instanceof Date) {
          this.pageQueryData[key]=this.commonEnum.getDefaultTime();
        }
      }
      pageQuery.data = JSON.parse(JSON.stringify(this.pageQueryData));
    } else if (this.pageQuery && this.pageQuery.data) {
      let oldData = JSON.parse(JSON.stringify(this.pageQuery.data));
      for (let key in oldData) {
        if (typeof oldData[key] === "string") {
          oldData[key] = null;
        } else if (typeof oldData[key] === "number") {
          oldData[key] = '';
        } else if (typeof oldData[key] === "object") {
          oldData[key] = null;
        }
      }
      pageQuery.data = oldData;
    } else {
      pageQuery.data = this.pageQueryData;
    }
    this.pageQuery = pageQuery;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
    this.initDataSort();
  }

  //初始化排序
  initDataSort() {
    let sortMap = new Array<SortItem>()
    if (this.initSort != null && this.initSort.length > 0) {
      this.initSort.forEach(sort => {
        this.tableFields.forEach(tableField => {
          if (tableField.field == sort.name) {
            tableField.sortValue = this.commonEnum.sortEnum.DESCEND.label;
            this.commonEnum.sortEnum.DATAS.forEach(sortEnum => {
              if (sort.value == sortEnum.label) {
                tableField.sortValue = sortEnum.label;
                let sortItem = new SortItem(tableField.field, sortEnum.value)
                sortMap.push(sortItem);
              }
            })
          } else {
            tableField.sortValue = null
          }
        });
      })
    } else {
      this.tableFields.forEach(tableField => {
        if (tableField.field == this.tableKeyCode) {
          tableField.sortValue = this.commonEnum.sortEnum.DESCEND.label;
          this.commonEnum.sortEnum.DATAS.forEach(sortEnum => {
            if (tableField.sortValue == sortEnum.label) {
              let sortItem = new SortItem(tableField.field, sortEnum.value)
              sortMap.push(sortItem);
            }
          })
        }
      });
    }
    this.pageQuery.sortMap = sortMap;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
    this.lazyLoadDataList();
  }

  //当前页改变事件
  pageIndexChange(event) {
    if(!this.stopChangePageQuery){
      if (event && event != this.oldPageQuery.pageNum) {
        let oldPageNum=this.pageQuery.pageNum;
        this.pageQuery.pageNum = event;
        this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
        this.lazyLoadDataList(null,()=>{
          this.pageQuery.pageNum=oldPageNum;
          this.oldPageQuery.pageNum=oldPageNum;
        });
      }
    }else{
      this.stopChangePageQuery=false;
    }
  }

  //每页显示记录数改变事件
  pageSizeChange(event) {
    if (event && event != this.oldPageQuery.pageSize) {
      this.pageQuery.pageSize = event;
      this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
      this.lazyLoadDataList();
    }
  }

  //排序
  dataSort(sortName: string, mutlSort: boolean) {
    let sortMap = new Array<SortItem>()
    this.tableFields.forEach(tableField => {
      if (tableField.sortable) {
        if (!mutlSort) {
          if (tableField.field != sortName) {
            tableField.sortValue = null;
          }
        }
        this.commonEnum.sortEnum.DATAS.forEach(sortEnum => {
          if (tableField.sortValue == sortEnum.label) {
            let sortItem = new SortItem(tableField.field, sortEnum.value)
            sortMap.push(sortItem);
          }
        })
      }
    })
    this.pageQuery.sortMap = sortMap;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
    this.lazyLoadDataList();
  }

  //点击标题排序
  thDataSort(sortName: string, mutlSort: boolean) {
    this.tableFields.forEach(tableField => {
      if (tableField.field == sortName) {
        if (tableField.sortValue == null || tableField.sortValue == '') {
          tableField.sortValue = this.commonEnum.sortEnum.DESCEND.label;
        } else {
          if (tableField.sortValue == this.commonEnum.sortEnum.DESCEND.label) {
            tableField.sortValue = this.commonEnum.sortEnum.ASCEND.label;
          } else if (tableField.sortValue == this.commonEnum.sortEnum.ASCEND.label) {
            tableField.sortValue = this.commonEnum.sortEnum.DESCEND.label;
          }
        }
      }
    });
    this.dataSort(sortName, mutlSort);
  }


  //刷新
  pageRefresh() {
    this.lazyLoadDataList()
  }

  //查询按钮获取数据
  getDataList() {
    this.pageQuery.pageNum = 1;
    this.oldPageQuery = JSON.parse(JSON.stringify(this.pageQuery));
    this.lazyLoadDataList();
  }

  //获取最后更新时间
  getLastLoadTime() {
    return (this.lastLoadTime.getHours() < 10 ? '0' + this.lastLoadTime.getHours() : this.lastLoadTime.getHours()) +
      ':' + (this.lastLoadTime.getMinutes() < 10 ? '0' + (this.lastLoadTime.getMinutes()) : this.lastLoadTime.getMinutes()) +
      ':' + (this.lastLoadTime.getSeconds() < 10 ? '0' + (this.lastLoadTime.getSeconds()) : this.lastLoadTime.getSeconds())
  }

  //列的值根据枚举中取值显示
  colTemplateFunction(tableField: any, rowData: any) {
    let result = "";
    tableField.format.forEach(value => {
      if (value.value == rowData[tableField.field]) {
        result = value.label;
      }
    })
    return result;
  }

  //获取当前选择的数据
  getCurrSelectData(){
    let currSelectData:number=-1;
    for(let i=0;i<this.dataList.length;i++){
      if(this.dataList[i].checked){
        currSelectData=i;
      }
    }
    return currSelectData;
  }

  //上键翻页选择数据
  keyEventSelectDataUp(data,callback?:(data:any) => void){
    let scrollBox= document.querySelectorAll('.con-table ')[0];
    scrollBox.scrollTop=data*40;
    if(!this.dataList||this.dataList.length<=0){
      return;
    }
    if(data==0&&this.pageQuery.pageNum>=1){
      let pageNum=this.pageQuery.pageNum-1;
      if(pageNum<=0){
        return;
      }
      this.pageQuery.pageNum=pageNum;
      this.oldPageQuery.pageNum=pageNum;
      this.stopChangePageQuery=true;
      this.requestDataList(()=>{
        this.singleCheck(this.dataList[this.dataList.length-1]);
        if(callback){
          scrollBox.scrollTop=scrollBox.scrollTop-40;
          callback(this.dataList[this.dataList.length-1]);
        }
      });
    }else{
      if(data<=0){
        this.singleCheck(this.dataList[0]);
        if(callback){
          scrollBox.scrollTop=scrollBox.scrollTop-40;
          callback(this.dataList[0]);
        }
      }else{
        this.singleCheck(this.dataList[data-1]);
        if(callback){
          scrollBox.scrollTop=scrollBox.scrollTop-40;
          callback(this.dataList[data-1]);
        }
      }
    }
  }
  //下键翻页选择数据
  keyEventSelectDataDown(data,callback?:(data:any) => void){
    let scrollBox= document.querySelectorAll('.con-table ')[0];
    scrollBox.scrollTop=data*40;
    if(!this.dataList||this.dataList.length<=0){
      return;
    }
    if(data==this.pageQuery.pageSize-1&&this.pageQuery.pageNum<=this.totalRecords){
      let pageNum=this.pageQuery.pageNum+1;
      if(pageNum>this.totalRecords){
        return;
      }
      this.pageQuery.pageNum=pageNum;
      this.oldPageQuery.pageNum=pageNum;
      this.stopChangePageQuery=true;
      this.requestDataList(()=>{
        this.singleCheck(this.dataList[this.dataList.length-1]);
        if(callback){
          scrollBox.scrollTop=scrollBox.scrollTop+40;
          callback(this.dataList[this.dataList.length-1]);
        }
      });
    }else{
      if(data<=-1){
        this.singleCheck(this.dataList[0]);
        if(callback){
          scrollBox.scrollTop=scrollBox.scrollTop+40;
          callback(this.dataList[0]);
        }
      }else{
        if(data+1>this.dataList.length-1){
          this.singleCheck(this.dataList[this.dataList.length-1]);
          if(callback){
            scrollBox.scrollTop=scrollBox.scrollTop+40;
            callback(this.dataList[this.dataList.length-1]);
          }
        }else{
          this.singleCheck(this.dataList[data+1]);
          if(callback){
            scrollBox.scrollTop=scrollBox.scrollTop+40;
            callback(this.dataList[data+1]);
          }
        }
      }

    }
  }

  //分页单选
  singleCheck(data){
    this.dataList.forEach(function (value) {
      value.checked=false;
    })
    data.checked=true;
  }

  //侧边栏打开
  sidebarOpen(sidebarMask?) {
    this.visibleSidebar = true;
    if (sidebarMask) {
      this.sidebarMask = sidebarMask;
    }
  }

  //侧边栏关闭
  sidebarClose(noskipRouter?) {
    this.visibleSidebar = false;
    if (this.sidebarMask) {
      this.sidebarMask = !this.sidebarMask;
    }
    if (noskipRouter) {
      return;
    } else {
      this.router.navigate(['./'], {relativeTo: this.acrouter});
    }
  }

  //新增页面
  toAddPage(data?:any) {
    this.router.navigate(["save"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.sidebarOpen(true);
    this.sharedService.send({desc: this.commonEnum.descEnum.ADD.value, data: {},service:this})
  }

  //批量新增页面
  toBatchAddPage(data) {
    this.router.navigate(["save"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.sidebarOpen(true);
    this.sharedService.send({desc: this.commonEnum.descEnum.BATCHADD.value, data: data,service:this})
  }

  //修改页面
  toEditPage(data) {
    this.router.navigate(["save"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.sidebarOpen(true);
    this.sharedService.send({desc: this.commonEnum.descEnum.UPDATE.value, data: data,service:this})
  }

  //批量修改页面
  toBatchEditPage(data) {
    this.router.navigate(["save"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.sidebarOpen(true);
    this.sharedService.send({desc: this.commonEnum.descEnum.BATCHUPDATE.value, data: data,service:this})
  }

  //详情页面
  toDetailPage(data) {
    data.visible = false;
    this.router.navigate(["save"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.sidebarOpen(true);
    this.sharedService.send({desc: this.commonEnum.descEnum.DETAIL.value, data: data,service:this})
  }

  //导出
  exportExcel(fileName?: string, exportcol?: any, customUrl?: any) {
    let params = JSON.parse(JSON.stringify(this.oldPageQuery));
    if (exportcol) {
      params.headerEn = exportcol
    } else {
      params.tableFields = this.tableFields;
    }
    this.export(params, fileName || "excel.xls", customUrl)
  }

  //导出
  exportExcelByTable(data: Array<any>, fileName?: string, customUrl?: any) {
    let params = JSON.parse(JSON.stringify(this.oldPageQuery));
    params.tableFields = this.tableFields;
    params.exportList = data;
    this.export(params, fileName || "excel.xls", customUrl)
  }

  //导入
  inputExcel(uploadUrl?: string, failExcelUrl?: string, inputSuccessCall?: (inputSuccessObj:any) => void) {
    this.inputexcelService.show({
      uploadUrl: uploadUrl || this.restService.baseUrl + '/importExcel',
      failExcelUrl: failExcelUrl || this.restService.baseUrl + '/downloadExcel',
      inputSuccessCall: inputSuccessCall||this.inputExcelAfterLoad,inputSuccessObj:this
    })
  }
  //导入之后加载数据
  inputExcelAfterLoad(inputSuccessObj){
    inputSuccessObj.getDataList();
  }
  //保存按钮启用
  saveButtonEnable() {
    this.saveButton = true;
  }

  //保存按钮禁用
  saveButtonDisable() {
    this.saveButton = false;
  }

  //保存数据
  save(data: any, desc?: any, url?: string, noConfirm?: boolean,callback?) {
    let dateUtil:DatepickerUtil=new DatepickerUtil();
    for(let key in data){
      if(data[key] instanceof Date){
        data[key]=dateUtil.formatDateToString(data[key],'YYYY-MM-DD HH:mm:ss')
      }
    }
    if (!noConfirm) {
      this.nzModalService.confirm({
        title: this.commonEnum.tipTemplateEnum.CONFIRMSAVE.title,
        content: this.commonEnum.tipTemplateEnum.CONFIRMSAVE.content,
        onOk: () => {
          this.saveData(data, desc, url,callback)
        },
        onCancel: () => {

        }
      });
    } else {
      this.saveData(data, desc, url,callback)
    }
  }

  //单删除(不根据主键删除)
  deleteOneNotByID(data) {
    this.nzModalService.confirm({
      title: this.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.title,
      content: this.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.content,
      onOk: () => {
        let valuesArr = [];
        valuesArr.push(data)
        this.delete(valuesArr);
      },
      onCancel: () => {

      }
    });
  }

  //单删除
  deleteOne(data,callback?) {
    this.nzModalService.confirm({
      title: this.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.title,
      content: this.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.content,
      onOk: () => {
        let valuesArr = [];
        let delValue = data[this.tableKeyCode];
        valuesArr.push(delValue);
        this.delete(valuesArr,callback);
      },
      onCancel: () => {

      }
    });

  }

  //多删除
  deleteMore(callback?) {
    this.nzModalService.confirm({
      title: this.commonEnum.tipTemplateEnum.CONFIRMDELETEMORE.title,
      content: this.commonEnum.tipTemplateEnum.CONFIRMDELETEMORE.content,
      onOk: () => {
        let valuesArr = [];
        this.selectedDataList.forEach(data => {
          valuesArr.push(data[this.tableKeyCode])
        })
        this.delete(valuesArr,callback);
      },
      onCancel: () => {

      }
    });

  }

  //多删除不需要ID
  deleteMoreNotByID() {
    this.nzModalService.confirm({
      title: this.commonEnum.tipTemplateEnum.CONFIRMDELETEMORE.title,
      content: this.commonEnum.tipTemplateEnum.CONFIRMDELETEMORE.content,
      onOk: () => {
        let valuesArr = [];
        this.selectedDataList.forEach(data => {
          valuesArr.push(data)
        })
        this.delete(valuesArr);
      },
      onCancel: () => {

      }
    });

  }

  //请求后台导出
  protected export(params: any, fileName: string, customUrl: any) {
    this.restService.export(params, fileName, customUrl)
  }

  //请求后台删除
  protected delete(data: any,callback?) {
    this.restService.del(data).subscribe(result => {
      if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
        this.messageService.success("操作成功！");
        if(callback){
          callback();
        }
        this.lazyLoadDataList(null);
      } else {
        this.messageService.error("操作失败！");
      }
      if (this.operateDataCall) {
        this.operateDataCall(this.dataList);
      }
    })
  }

  //请求后台保存数据
  protected saveData(data: any, desc?: any, url?: string,callback?) {
    if (desc == this.commonEnum.descEnum.ADD.value) {
      this.restService.add(data, url).subscribe(result => {
        if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
          this.messageService.success("数据添加成功！");
          if(callback){
            callback();
          }
          this.lazyLoadDataList(null);
          this.sidebarClose();
        } else {
          this.messageService.error("数据有误，请重新填写！")
        }
        if (this.operateDataCall) {
          this.operateDataCall(this.dataList);
        }
      })
    } else if (desc == this.commonEnum.descEnum.UPDATE.value) {
      this.restService.upt(data, url).subscribe(result => {
        if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
          this.messageService.success("数据修改成功！");
          if(callback){
            callback();
          }
          this.lazyLoadDataList(data);
          this.sidebarClose();
        } else {
          this.messageService.error("数据修改失败！");
        }
        if (this.operateDataCall) {
          this.operateDataCall(this.dataList);
        }
      })
    }
  }
  //懒加载获取数据
  lazyLoadDataList(autoSelectDataList?: any,callback?:Function) {
    if(this.CONFIRM_QUERY){
      //添加如果时间范围过大确认查询提示
      let isConfirmQuery:boolean=false;
      let continueQuery:boolean=true;
      this.nzModalService
      for(let key in this.oldPageQuery.data){
        if(this.oldPageQuery.data[key] instanceof Array){
          if(this.oldPageQuery.data[key].length>1){
            let start=new Date(this.oldPageQuery.data[key][0]);
            let end=new Date(this.oldPageQuery.data[key][1]);
            if(end.getTime()-start.getTime()>=this.commonEnum.getDefaultMaxTimeConfirmTip()){
              isConfirmQuery=true;
            }
          }
        }
      }
      if(isConfirmQuery){
        this.nzModalService.confirm({
          title: this.commonEnum.tipTemplateEnum.CONFIRMQUERY.title,
          content: this.commonEnum.tipTemplateEnum.CONFIRMQUERY.content,
          onOk: () => {
            this.requestDataList(autoSelectDataList);
          },
          onCancel: () => {
            if(callback){
              callback.call(this)
            }
          }
        });
      }else{
        this.requestDataList(autoSelectDataList);
      }
    }else{
      this.requestDataList(autoSelectDataList);
    }
  }

  requestDataList(autoSelectDataList?: any,callback?:Function){
    let dataListRequest;
    this.loading = true;
    this.sidebarClose();
    this.dataList = [];
    this.totalRecords = 0;
    let requestStartTime:Date=new Date();
    let requestInterval=setInterval(() => {
      if((new Date().getTime()-requestStartTime.getTime())>60000){
        /*
        this.loading = false;
        dataListRequest.unsubscribe();
        this.messageService.remove();
        this.messageService.info("请求超时请再试一次",{nzDuration:3000});
        clearInterval(requestInterval);
        */
      }
    }, 100)
    dataListRequest=this.restService.dataList(this.oldPageQuery).subscribe(result => {
      this.loading = false;
      clearInterval(requestInterval);
      this.loggerService.log("[dataTableService] [lazyLoadDataList] 请求耗时------"+(requestStartTime.getTime()-new Date().getTime())+"------毫秒");
      if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
        this.dataList = result.data.rows;
        this.dataMultiCheckService.setDatas(this.dataList);
        this.dataMultiCheckService.refreshStatus();
        this.totalRecords = result.data.total;
        this.lastLoadTime = new Date();
        if (autoSelectDataList) {
          this.autoSelectDataList(autoSelectDataList);
        }

        if (this.lazyLoadDataListCall) {
          this.lazyLoadDataListCall(this.dataList);
        }
        if(callback){
          callback.call(this)
        }
      }else{
        if(result.msg){
          this.messageService.error(result.msg)
        }else{
          this.messageService.error("请求数据错误")
        }
      }
    })
  }

  //编辑等操作自动选中
  autoSelectDataList(dataList) {
    if (!this.tableKeyCode) {
      return;
    }
    let tableKeyCodeArr = this.fieldUniqueData ? this.fieldUniqueData.split(",") : this.tableKeyCode.split(",");
    this.dataList.forEach(data => {
      if (dataList instanceof Array) {
        dataList.forEach(value => {
          if (this.objIsEqualByFields(tableKeyCodeArr, data, value)) {
            data.checked = true;
            this.selectedDataList.push(data);
          }
        })
      } else {
        if (this.objIsEqualByFields(tableKeyCodeArr, data, dataList)) {
          data.checked = true;
          this.selectedDataList.push(data);
        }
      }
    })
    this.dataMultiCheckService.refreshStatus();
  }

  //根据多个字段比较两个对象是否相等
  objIsEqualByFields(arr: Array<string>, src, tar): boolean {
    let srcValStr = '';
    let tarValStr = '';
    for (let i = 0; i < arr.length; i++) {
      srcValStr += src[arr[i]];
      tarValStr += tar[arr[i]];
    }
    if (srcValStr == tarValStr) {
      return true;
    } else {
      return false;
    }
  }

  //根据字符串获取日期
  formatStringToDate(date:string){
    return DatepickerUtil.formatStringToDate(date);
  }

  //自动刷新
  autoRefreshChange() {
    if (this.refreshable) {
      this.autoRefreshClose()
    } else {
      this.autoRefreshOpen()
    }
    this.refreshswitch = !this.refreshswitch;
  }

  //自动刷新关闭
  autoRefreshClose() {
    this.refreshable = false;
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  }

  //自动刷新打开
  autoRefreshOpen() {
    this.autoRefreshClose();
    this.refreshable = true;
    this.autoRefresh();
  }

  //自动定时
  private autoRefresh() {
    if (this.refreshable) {
      this.refreshInterval = setInterval(() => {
        this.getDataList()
      }, this.refreshTimer)
    }
  }

}
