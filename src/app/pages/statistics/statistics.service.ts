import { Injectable } from '@angular/core';
import {
  NzMessageService,
  NzModalService,
  RestService,
  SharedService, TokenService
} from "../../framework";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonEnum,  QueryInit} from "../../common/entity";
import { Observable } from "rxjs/Observable";
import { PageQuery } from '../../common/index';
import * as dateUtil from 'date-fns'
@Injectable()
export class StatisticsService{
  public dateUtil=dateUtil;
  //当前活跃的路由，由组件提供
  private _acrouter: ActivatedRoute;
  //sharedService的订阅对象，最后销毁需要取消订阅
  private _sharedServiceSubscription;
  //当前查询参数
  private _pageQuery: any;
  //初始化查询参数
  private _pageQueryData: any;
  //最后更新时间
  public lastLoadTime: Date = new Date();
  //是否自动刷新
  public refreshable = false;
  //自动刷新定时器
  public refreshInterval;
  //自动刷新定时器时间间隔Enum
  public refreshTimer;
  //自动回调
  public refreshCall: () => void;

  public readonly labelOption = {
    normal: {
      show: true,
      position: 'top',
      distance: 5,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}',
      fontSize: 10,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      },
    }
  };
  public readonly labelOptionInside = {
    normal: {
      show: true,
      position: 'inside',
      distance: 5,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}',
      fontSize: 10,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      },
    }
  };
  public readonly labelOptionInsideLeft = {
    normal: {
      show: true,
      position: 'insideLeft',
      distance: 5,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}',
      fontSize: 10,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      },
    }
  };
  public readonly labelOptionInsideRight = {
    normal: {
      show: true,
      position: 'insideRight',
      distance: 5,
      align: 'left',
      verticalAlign: 'middle',
      rotate: '90',
      formatter: '{c}',
      fontSize: 10,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      },
    }
  };
  public readonly dayData=["y", "t", "m"]
  public readonly hourData=["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
  public readonly hourData72=[
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
  ]
  //私有属性的set get 方法，便于对属性值改变做出处理
  set pageQuery(pageQuery: any) {
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

  //获取最后更新时间
  getLastLoadTime() {
    return (this.lastLoadTime.getHours() < 10 ? '0' + this.lastLoadTime.getHours() : this.lastLoadTime.getHours()) +
      ':' + (this.lastLoadTime.getMinutes() < 10 ? '0' + (this.lastLoadTime.getMinutes()) : this.lastLoadTime.getMinutes()) +
      ':' + (this.lastLoadTime.getSeconds() < 10 ? '0' + (this.lastLoadTime.getSeconds()) : this.lastLoadTime.getSeconds())
  }

  //获取刷新时间
  getRefreshTime() {
    for(let i=0;i<this.commonEnum.refreshTimeEnum.DATAS.length;i++){
      let item=this.commonEnum.refreshTimeEnum.DATAS[i];
      if(item.value==this.refreshTimer){
        return item.label;
      }
    }
    return '';
  }

  constructor(public readonly restService: RestService,
              public readonly sharedService: SharedService,
              public readonly commonEnum: CommonEnum,
              public readonly tokenService: TokenService,
              public readonly router: Router,) {

  }

  //用于初始化数据
  init(queryInit: QueryInit) {
    this.acrouter = queryInit.acrouter;
    this.restService.baseUrl = queryInit.baseUrl;
    this.restService.templetUrl = queryInit.templetUrl;
    this.pageQueryData = queryInit.pageQueryData || {};
    if (queryInit.isRefreshable == true) {
      this.refreshable=queryInit.isRefreshable;
      this.refreshTimer=this.commonEnum.refreshTimeEnum.DEFAULT.value;
      this.autoRefreshOpen();
    } else {
      this.autoRefreshClose();
    }
    this.refreshCall=queryInit.refreshCall;
    this.initPageQuery();
  }

  //初始化查询参数
  initPageQuery() {
    let pageQuery:any ={};
    if(this.pageQueryData){
      pageQuery=JSON.parse(JSON.stringify(this.pageQueryData));
    }
    this.pageQuery = pageQuery;
  }

  // //获取航班按小时统计的数据
  getFlightHourStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsFlightStat'+'/hourlyStatistics',).map((result:any) => {
      let flightHourStatData=[];
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        let typeAtotal=[];
        let typeDtotal=[];
        let typeAdelay=[];
        let typeAcancle=[];
        let typeDdelay=[];
        let typeDcancle=[];

        //封装统计数据
        if(result.data){
          let hourATotal=result.data.hourATotal||{};
          let hourDTotal=result.data.hourDTotal||{};
          let hourACan=result.data.hourACan||{};
          let hourDCan=result.data.hourDCan||{};
          let hourADly=result.data.hourADly||{};
          let hourDDly=result.data.hourDDly||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(hour=>{
              typeAtotal.push(hourATotal[day+'numHour'+hour]||0);
              typeDtotal.push(hourDTotal[day+'numHour'+hour]||0);
              typeAcancle.push(hourACan[day+'numHour'+hour]||0);
              typeDcancle.push(hourDCan[day+'numHour'+hour]||0);
              typeAdelay.push(hourADly[day+'numHour'+hour]||0);
              typeDdelay.push(hourDDly[day+'numHour'+hour]||0);
            })
          })
          flightHourStatData.push(typeAtotal,typeAcancle,typeAdelay,typeDtotal,typeDcancle,typeDdelay);
        }
      }
      return flightHourStatData;
    })
  }


  getFlightCurrStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsFlightStat'+'/currStatistics',).map((result:any) => {
      let flightStatData={};
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        if(result.data){
          flightStatData=result.data.currentData||{}
        }
      }
      return flightStatData;
    })
  }

  getFlightDayStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsFlightStat'+'/dayStatistics',).map((result:any) => {
      let flightDayStatData={};
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        if(result.data){
          flightDayStatData=result.data
        }
      }

      return flightDayStatData;
    })
  }


  getPassengerCurrStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsPassengerStat'+'/currStatistics',).map((result:any) => {
      let psgStatData={};
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        if(result.data){
          psgStatData=result.data.currentData||{}
        }
      }
      return psgStatData;
    })
  }

  //获取旅客按天信息统计数据
  getPassengerStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsPassengerStat'+'/dayStatistics',).map((result:any) => {
      let passengerDayStatData={};
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        if(result.data){
          passengerDayStatData=result.data
        }
      }
      return passengerDayStatData;
    })
  }

  //获取旅客按小时信息统计数据
  getPassengerHourStat():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsPassengerStat'+'/hourlyStatistics',).map((result:any) => {
      let passengerHourStatData=[];
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        let typeCheck=[];
        let typeVertify=[];
        let typeBoard=[]
        //封装统计数据
        if(result.data){
          let hourCheckin=result.data.hourCheckin||{};
          let hourVerify=result.data.hourVerify||{};
          let hourBoard=result.data.hourBoard||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(hour=>{
              typeCheck.push(hourCheckin[day+'numHour'+hour]||0);
              typeVertify.push(hourVerify[day+'numHour'+hour]||0);
              typeBoard.push(hourBoard[day+'numHour'+hour]||0);
            })
          })
          passengerHourStatData.push(typeCheck,typeVertify,typeBoard);
        }
      }
      return passengerHourStatData;
    })
  }

  // 获取交运行李按天统计数据
  getLugDayStatData():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsLuggageStat'+'/dayStatistics',).map((result:any) => {
      let luggageDayStatData={};
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        if(result.data){
          luggageDayStatData=result.data;
        }
      }
      return luggageDayStatData;

    })
  }

  //获取行李按小时统计数据
  getLugHourStatData():Observable<any>{
    return this.restService.restRequest(this.pageQuery,'/statistics/simsLuggageStat'+'/hourlyStatistics',).map((result:any)=>{
      let luggageHourStatDataList:any=[];
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        let typeLug:any=[];
        let typeUnp:any=[];
        let typeArt:any=[];
        if(result.data){
          let hourLuggage = result.data.hourLuggage||{};
          let hourUnpack = result.data.hourUnpack||{};
          let hourArticle = result.data.hourArticle||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(data=>{
              typeLug.push(hourLuggage[day+'numHour'+data]||0);
              typeUnp.push(hourUnpack[day+'numHour'+data]||0);
              typeArt.push(hourArticle[day+'numHour'+data]||0);
            })
          })
          luggageHourStatDataList.push(typeLug,typeUnp,typeArt);
        }
      }
      return luggageHourStatDataList;
    })
  }

  // 获取登机口按天统计数据
  getGateDayStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsGateHourStat/dayStatistics',).map((result:any)=>{
      let gateDayStatData={};
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        gateDayStatData=result.data;
      }
      return gateDayStatData;
    })
  }

  // 获取登机口按小时统计数据
  getGateHourStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsGateHourStat/hourlyStatistics',).map((result:any)=>{
      let getGateHourStatDataList = [];
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        let typeBoa = [];
        let typeFli = [];
        if(result.data){
          let hourBoard=result.data.hourBoard||{};
          let hourFlight=result.data.hourFlight||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(data=>{
              typeBoa.push(hourBoard[day+'numHour'+data]||0);
              typeFli.push(hourFlight[day+'numHour'+data]||0);
            })
          })
          getGateHourStatDataList.push(typeBoa,typeFli);
        }
      }
      return getGateHourStatDataList;
    })
  }

  // 获取通道口按天统计数据
  getChannelDayStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsChannelStat/dayStatistics',).map((result:any)=>{
      let channelDayStatData={};
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        channelDayStatData=result.data;
      }
      return channelDayStatData;
    })
  }

  // 获取通道口按小时统计数据
  getChannelHourStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsChannelStat/hourlyStatistics',).map((result:any)=>{
      let getChannelHourStatDataList = [];
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        let typePass = [];
        let typeUnp = [];
        let typeArt = [];
        if(result.data){
          let hourPassenger=result.data.hourPassenger||{};
          let hourUnpack=result.data.hourUnpack||{};
          let hourArticle=result.data.hourArticle||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(data=>{
              typePass.push(hourPassenger[day+'numHour'+data]||0);
              typeUnp.push(hourUnpack[day+'numHour'+data]||0);
              typeArt.push(hourArticle[day+'numHour'+data]||0);
            })
          })
          getChannelHourStatDataList.push(typePass,typeUnp,typeArt);
        }
      }
      return getChannelHourStatDataList;
    })

  }


  // 获取预安检按天统计数据
  getPreVerifyDayStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsPreVerifyStat/dayStatistics',).map((result:any)=>{
      let preVerifyDayStatData={};
      if(result.code == this.commonEnum.resultEnum.SUCCESS.value){
        preVerifyDayStatData=result.data;
      }
      return preVerifyDayStatData;
    })
  }

  // 获取预安检按小时统计数据
  getPreVerifyHourStatData(){
    return this.restService.restRequest(this.pageQuery,'/statistics/simsPreVerifyStat/hourlyStatistics',).map((result:any)=>{
      let preVerifyDayStatDataList = [];
      let getPreVerifyHourStatDataList = [];
      if(result.code==this.commonEnum.resultEnum.SUCCESS.value){
        let typePass = [];
        preVerifyDayStatDataList = result.data.simsPreVerifyHourStats;
        if(result.data){
          let hourPassenger=result.data.statisticsResult||{};
          this.dayData.forEach(day=>{
            this.hourData.forEach(data=>{
              typePass.push(hourPassenger[day+'NumHour'+data]||0);
            })
          })
          getPreVerifyHourStatDataList.push(typePass,preVerifyDayStatDataList);
        }
      }
      return getPreVerifyHourStatDataList;
    })

  }




  //导出
  exportExcel(fileName?: string, customUrl?:any) {
    let params = JSON.parse(JSON.stringify(this.pageQuery));
    this.export(params, fileName || "excel.xls",customUrl)
  }

  //请求后台导出
  protected export(params: any, fileName: string,customUrl:any) {
    this.restService.export(params, fileName ,customUrl)
  }

  //自动刷新关闭
  autoRefreshClose() {
    this.refreshable=false;
    this.cleanTimer();
  }

  //自动刷新打开
  autoRefreshOpen() {
    this.cleanTimer();
    this.refreshable=true;
    this.autoRefresh();
  }

  //自动刷新定时器改变
  autoRefreshTimerChange(value) {
    this.cleanTimer();
    this.refreshable=true;
    this.autoRefresh();
  }

  //自动定时
  private autoRefresh() {
    if (this.refreshable) {
      this.refreshInterval = setInterval(() => {
        if(this.refreshCall){
          this.refreshCall();
        }
      }, this.refreshTimer)
    }
  }

  private cleanTimer(){
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  }
}
