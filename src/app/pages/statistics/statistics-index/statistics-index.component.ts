import {ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {StatisticsService} from "../statistics.service";
import {QueryInit} from "../../../common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statistics-index',
  templateUrl: './statistics-index.component.html',
  styleUrls: ['./statistics-index.component.css']
})
export class StatisticsIndexComponent implements OnInit, OnDestroy {
  //用户信息
  public userDetails: any;
  //昨天今天明天
  public flightDate: any;
  //日期
  public dateInfo: any;
  public refreshBox = false;
  private refreshBoxClick = false;
  private documentClickListener: any;
  //航班统计图范围值
  public flightHourStatRange: any
  //航班信息按小时统计数据
  public flightHourStatData = [];
  //航班信息按小时统计配置
  public flightHourStatOption: any = {};
  //航班信息按小时统计图标实例
  public flightHourStatIntance: any;
  //航班信息按天统计数据
  public flightDayStatData: any = {};
  //航班信息按天统计配置
  public flightDayStatOption: any = {};
  //航班左侧饼图是否显示
  private _flightIsCollapsed = false;
  //旅客统计图范围值
  public psgHourStatRange: any;
  //旅客信息按小时统计数据
  public psgHourStatData = [];
  //旅客信息按小时统计配置
  public psgHourStatOption: any = {};
  //旅客信息按小时统计图标实例
  public psgHourStatIntance: any;
  //旅客信息按天统计数据
  public psgDayStatData: any = {};
  //旅客信息按天统计配置
  public psgDayStatOption: any = {};
  //旅客左侧饼图是否显示
  private _psgIsCollapsed = false;
  //行李统计图范围值
  public lugHourStatRange: any
  //行李信息按小时统计数据
  public lugHourStatData = [];
  //行李信息按小时统计配置
  public lugHourStatOption: any = {};
  //行李信息按小时统计图标实例
  public lugHourStatIntance: any;
  //行李信息按天统计数据
  public lugDayStatData: any = {};
  //行李信息按天统计配置
  public lugDayStatOption: any = {};
  //行李左侧饼图是否显示
  private _lugIsCollapsed = false;

  get flightIsCollapsed() {
    return this._flightIsCollapsed;
  }

  set flightIsCollapsed(flightIsCollapsed: boolean) {
    this._flightIsCollapsed = flightIsCollapsed;
    setTimeout(()=>{
      this.setFlightHourStatOptions();
    },100)
  }

  get psgIsCollapsed() {
    return this._psgIsCollapsed;
  }

  set psgIsCollapsed(psgIsCollapsed: boolean) {
    this._psgIsCollapsed = psgIsCollapsed;
    setTimeout(()=>{
      this.setPsgHourStatOptions();
    },100)
  }

  get lugIsCollapsed() {
    return this._lugIsCollapsed;
  }

  set lugIsCollapsed(lugIsCollapsed: boolean) {
    this._lugIsCollapsed = lugIsCollapsed;
    setTimeout(()=>{
      this.setLugHourStatOptions();
    },100)

  }

  constructor(
    public statisticsService: StatisticsService,
    public el: ElementRef,
    public renderer: Renderer2,
    @Inject('APP_NAME') public readonly APP_NAME: string,
    @Inject('APP_VERSION') public readonly APP_VERSION: string,
    public cd: ChangeDetectorRef,
    public router: Router,) {
  }

  ngOnInit() {
    this.flightDate = this.statisticsService.commonEnum.flightDateEnum.TODAY.value
    this.psgHourStatRange = this.statisticsService.commonEnum.statRangeEnum.MIDDLE.value;
    this.lugHourStatRange = this.statisticsService.commonEnum.statRangeEnum.MIDDLE.value;
    this.flightHourStatRange = this.statisticsService.commonEnum.statRangeEnum.MIDDLE.value;
    let initParams: QueryInit = {
      pageQueryData: {
        pstatDate: this.getPstatDate()
      },
      isRefreshable: true,
      isRefreshswitch: true,
      refreshCall: () => {
        this.initChart();
      }
    }

    this.statisticsService.init(initParams);
    this.statisticsService.tokenService.getUserDetailsFromLocalStorge().subscribe(userInfo => {
      this.userDetails = userInfo.value;
    });
    this.statisticsService.sharedServiceSubscription=this.statisticsService.sharedService.observable.subscribe(data=>{
      if(data.desc==this.statisticsService.commonEnum.descEnum.MENUCOLLAPSED.value){
        setTimeout(()=>{
          this.setFlightHourStatOptions();
          this.setPsgHourStatOptions();
          this.setLugHourStatOptions();
        },100)
      }
    })
    this.initChart();
  }

  initChart() {
    this.getFlightStat();
    this.getPsgStat();
    this.getLugStat();
    this.setDateInfo();
    this.statisticsService.lastLoadTime = new Date();
  }

  //自动刷新监测窗口body的事件
  refreshBoxChange(event) {
    this.refreshBox = !this.refreshBox;
    this.refreshBoxClick = true;
    if (this.refreshBox) {
      this.bindDocumentClickListener();
    } else {
      this.unbindDocumentClickListener();
    }
    event.stopPropagation();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (!this.refreshBoxClick && this.refreshBox) {
          this.refreshBox = false;
        }
        this.refreshBoxClick = false;
        this.cd.detectChanges();
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener = null;
    }
  }


  //根据flightDate（今天昨天明天）获取日期
  getPstatDate() {
    let now = new Date();
    if (this.flightDate == this.statisticsService.commonEnum.flightDateEnum.TODAY.value) {
      return new Date();
    } else if (this.flightDate == this.statisticsService.commonEnum.flightDateEnum.YESTERDAY.value) {
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    } else if (this.flightDate == this.statisticsService.commonEnum.flightDateEnum.TOMORROW.value) {
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else {
      return new Date();
    }
  }

  flightDateValueChange(value) {
    this.statisticsService.pageQuery.pstatDate = this.getPstatDate();
    this.initChart()
  }

  //设置当前时间信息
  setDateInfo() {
    let now = new Date();
    let nowDay = now.getDay();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let nowStr = this.statisticsService.dateUtil.format(now, 'YYYY年M月D日');
    this.dateInfo = '今天是' + nowStr + '，' + weekday[nowDay];
  }

  //初始化航班小时统计图表实例
  initFlightHourStatIntance(ec) {
    this.flightHourStatIntance = ec;
  }
  //初始化旅客小时统计图表实例
  initPsgHourStatIntance(ec){
    this.psgHourStatIntance = ec;
  }
  //初始化行李小时统计图表实例
  initLugHourStatIntance(ec){
    this.lugHourStatIntance = ec;
  }

  //航班统计图大小改变
  flightHourStatResizeChart() {
    if (this.flightHourStatIntance) {
      this.flightHourStatIntance.resize(
      );
    }
  }

  //航班统计区间范围
  flightHourStatRangeClick() {
    this.setFlightHourStatOptions();
  }

  //旅客统计区间范围
  psgHourStatRangeClick() {
    this.setPsgHourStatOptions();
  }

  //行李统计区间范围
  lugHourStatRangeClick() {
    this.setLugHourStatOptions();
  }

  //加载航班数据
  getFlightStat() {
    this.statisticsService.getFlightHourStat().subscribe(result => {
      this.flightHourStatData = result;
      this.setFlightHourStatOptions();
    })
    this.statisticsService.getFlightCurrStat().subscribe(result => {
      this.flightDayStatData = result;
      this.setFlightDayStatOption();
    })
  }

  //加载旅客数据
  getPsgStat() {
    this.statisticsService.getPassengerHourStat().subscribe(result => {
      this.psgHourStatData = result;
      this.setPsgHourStatOptions();
    })
    this.statisticsService.getPassengerCurrStat().subscribe(result => {
      this.psgDayStatData = result;
      this.setPsgDayStatOption();
    })
  }

  //加载行李数据
  getLugStat() {
    this.statisticsService.getLugHourStatData().subscribe(result => {
      this.lugHourStatData = result;
      this.setLugHourStatOptions();
    })
    this.statisticsService.getLugDayStatData().subscribe(result => {
      this.lugDayStatData = result.day;
    })
  }

  setFlightHourStatOptions() {
    if(this.flightHourStatIntance){
      this.flightHourStatIntance.clear();
    }
    this.flightHourStatOption = {};
    this.flightHourStatOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        borderWidth: 0,
        right: 20,
        left: 50,
        bottom: 40,
        top: 30,
      },
      xAxis: {
        type: 'category',
        data: this.statisticsService.hourData72
      },
      yAxis: {
        type: 'value',
      },
      calculable: true,
      dataZoom: [
        {
          show: false,
          start: this.flightHourStatRange.start,
          end: this.flightHourStatRange.end,
        },
        {
          type: 'inside',
          start: this.flightHourStatRange.start,
          end: this.flightHourStatRange.end,
        },
      ],
      series: [
        {
          name: '进港',
          type: 'bar',
          stack: 'one',
          animation: false,
          label: this.statisticsService.labelOption,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.flightHourStatData[0],
          barMaxWidth: '40%',
          barWidth: '20%',
        }, {
          name: '出港',
          type: 'bar',
          stack: 'two',
          animation: false,
          label: this.statisticsService.labelOption,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.flightHourStatData[3],
          barMaxWidth: '40%',
          barWidth: '20%',
        }
      ],
      color: ['#04A7B8', '#EC9F5A']
    };
    setTimeout(()=>{
      if(this.flightHourStatIntance){
        this.flightHourStatIntance.resize();
      }
    },100)
  }

  setFlightDayStatOption() {
    this.flightDayStatOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{c}次({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        selectedMode: false,
        data: ['起飞', '计划', '延误', '取消']
      },
      series: [
        {
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [this.flightDayStatData.takeoffNum || 0, this.flightDayStatData.planNum || 0, this.flightDayStatData.dlyNum || 0, this.flightDayStatData.canNum || 0],
          animation: false,
          label: {
            normal: {
              show: false,
              formatter: "{c}次({d}%)"
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#04A7B8', '#EC9F5A', '#DE4357', '#618087']
        },
        {
          type: 'pie',
          radius: ['60%', '60%'],
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [{value: this.flightDayStatData.totalNum || 0, name: '总航班架次'}],
          animation: false,
          silent: true,
          label: {
            normal: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '18',
                color: '#999'
              },
              formatter: "{b}\n{c}"
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ],  
      
    };
  }

  setPsgHourStatOptions() {
    if(this.psgHourStatIntance){
      this.psgHourStatIntance.clear();
    }
    this.psgHourStatOption = {};
    this.psgHourStatOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        borderWidth: 0,
        right: 20,
        left: 50,
        bottom: 40,
        top: 30,
      },
      xAxis: {
        type: 'category',
        data: this.statisticsService.hourData72
      },
      yAxis: {
        type: 'value',
      },
      calculable: true,
      dataZoom: [
        {
          show: false,
          start: this.psgHourStatRange.start,
          end: this.psgHourStatRange.end,
        },
        {
          type: 'inside',
          start: this.psgHourStatRange.start,
          end: this.psgHourStatRange.end,
        },
      ],
      series: [
        {
          name: '值机数',
          type: 'bar',
          stack: 'one',
          animation: false,
          label: this.statisticsService.labelOption,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.psgHourStatData[0],
          barMaxWidth: '40%',
          barWidth: '20%',
        }, {
          name: '安检数',
          type: 'bar',
          stack: 'two',
          animation: false,
          label: this.statisticsService.labelOption,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.psgHourStatData[1],
          barMaxWidth: '40%',
          barWidth: '20%',
        }, {
          name: '登机数',
          type: 'bar',
          stack: 'three',
          animation: false,
          label: this.statisticsService.labelOption,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.psgHourStatData[2],
          barMaxWidth: '40%',
          barWidth: '20%',
        }
      ],
      color: ['#04A7B8', '#618087', '#EC9F5A']
    };
    setTimeout(()=>{
      if(this.psgHourStatIntance){
        this.psgHourStatIntance.resize();
      }
    },100)
  }

  setPsgDayStatOption() {
    this.psgDayStatOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{c}次({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        selectedMode: false,
        data: ['值机数', '安检数', '登机数']
      },
      series: [
        {
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [this.psgDayStatData.checkinNum || 0, this.psgDayStatData.verifyNum || 0, this.psgDayStatData.boardNum || 0],
          animation: false,
          label: {
            normal: {
              show: false,
              formatter: "{c}次({d}%)"
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          color: ['#04A7B8', '#618087', '#EC9F5A']
        },
        {
          type: 'pie',
          radius: ['60%', '60%'],
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [{
            value: (this.psgDayStatData.totalNum || 0),
            name: '总旅客数'
          }],
          animation: false,
          silent: true,
          label: {
            normal: {
              show: true,
              position: 'center',
              textStyle: {
                fontSize: '18',
                color: '#999'
              },
              formatter: "{b}\n{c}"
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
        }
      ]
      
    }
  }

  setLugHourStatOptions() {
    if(this.lugHourStatIntance){
      this.lugHourStatIntance.clear();
    } 
    this.lugHourStatOption = {};
    this.lugHourStatOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        borderWidth: 0,
        right: 20,
        left: 50,
        bottom: 40,
        top: 30,
      },
      xAxis: {
        type: 'category',
        data: this.statisticsService.hourData72
      },
      yAxis: {
        type: 'value',
      },
      calculable: true,
      dataZoom: [
        {
          show: false,
          start: this.lugHourStatRange.start,
          end: this.lugHourStatRange.end,
        },
        {
          type: 'inside',
          start: this.lugHourStatRange.start,
          end: this.lugHourStatRange.end,
        },
      ],
      series: [
        {
          name: '交运行李数',
          type: 'bar',
          stack: 'one',
          animation: false,
          label: this.statisticsService.labelOptionInsideLeft,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.lugHourStatData[0],
          barMaxWidth: '40%',
          barWidth: '20%',
        }, {
          name: '开包数',
          type: 'bar',
          stack: 'one',
          animation: false,
          label: this.statisticsService.labelOptionInside,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.lugHourStatData[1],
          barMaxWidth: '40%',
          barWidth: '20%',
        }, {
          name: '开包物品数',
          type: 'bar',
          stack: 'one',
          animation: false,
          label: this.statisticsService.labelOptionInsideRight,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
            }
          },
          data: this.lugHourStatData[2],
          barMaxWidth: '40%',
          barWidth: '20%',
        }
      ],
      color: ['#04A7B8', '#EC9F5A', '#618087']
    };
    setTimeout(()=>{
      if(this.lugHourStatIntance){
        this.lugHourStatIntance.resize();
      }
    },100)
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
    this.statisticsService.autoRefreshClose();
    if(this.statisticsService.sharedServiceSubscription){
      this.statisticsService.sharedServiceSubscription.unsubscribe();
    }
  }
}
