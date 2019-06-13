import {Component, OnInit,OnDestroy} from '@angular/core';
import {StatisticsService} from '../statistics.service';
import {DataTableService,QueryInit} from '../../../common';

@Component({
  selector: 'app-sims-passenger-stat',
  templateUrl: './sims-passenger-stat.component.html',
  styleUrls: ['./sims-passenger-stat.component.css'],
  providers:[DataTableService],
})
export class SimsPassengerStatComponent implements OnInit,OnDestroy {
  public passengerDayStatData: any = {};
  public passengerlistByT: any = [];
  public passengerHourStatOption: any = {};
  public passengerHourStatData = [];

  //旅客统计图范围值
  public psgHourStatRange: any;
  //旅客信息按小时统计图标实例
  public psgHourStatIntance: any;

  //Excel导出
  public thisUrl: any = '/statistics/simsPassengerStat/exportExcel';
  public thisUrl2: any = '/statistics/simsPassengerStat/export';

  constructor(
    public statisticsService: StatisticsService,
    public dataTableService: DataTableService,) {
  }


  ngOnInit() {
    this.psgHourStatRange = this.statisticsService.commonEnum.statRangeEnum.MIDDLE.value;
    let initParams: QueryInit = {
      pageQueryData: {
        pstatDate: this.statisticsService.commonEnum.getDefaultTime(),
        pterminal: this.dataTableService.commonEnum.terminalListEnum.DEFAULT,
      },
    };
    this.statisticsService.init(initParams);
    this.statisticsService.sharedServiceSubscription=this.statisticsService.sharedService.observable.subscribe(data=>{
      if(data.desc==this.statisticsService.commonEnum.descEnum.MENUCOLLAPSED.value){
        setTimeout(()=>{
          this.setPassengerHourStatOptions();
        },100)
      }
    })
    this.initChart();
  }

  initChart() {
    this.getPassengerStat();
    this.setPassengerHourStatOptions();
  }

  //获取旅客统计数据
  getPassengerStat() {
    //按天统计数据
    this.statisticsService.getPassengerStat().subscribe(result => {
      this.passengerDayStatData = result.day;
      this.passengerlistByT = [];
      if (result.dayList) {
        result.dayList.forEach(data => {
          this.passengerlistByT.push({label:(data.terminal+this.colTemplateFunction(data.attr)),value:data.verifyNum});
        });
      } else {
        this.passengerlistByT = [];
      }
    });
    //按小时统计数据
    this.statisticsService.getPassengerHourStat().subscribe(result => {
        this.passengerHourStatData = result;
        this.setPassengerHourStatOptions();
      }
    );
  }


  //列的值根据枚举中取值显示
  colTemplateFunction(tableField:any){
      let result="";
      this.dataTableService.commonEnum.airportAttrEnum.INPUTDATAS.forEach(value=>{
        if(value.value==tableField){
          result=value.label;
        }
      })
      return result;
  }
  //旅客统计区间范围
  psgHourStatRangeClick() {
    this.setPassengerHourStatOptions();
  }
  //初始化旅客小时统计图表实例
  initPsgHourStatIntance(ec){
    this.psgHourStatIntance = ec;
  }

  // 设置图表数据
  setPassengerHourStatOptions() {
    if(this.psgHourStatIntance){
      this.psgHourStatIntance.clear();
    }
    this.passengerHourStatOption={};
    this.passengerHourStatOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
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
          type: 'inside',
          start: this.psgHourStatRange.start,
          end: this.psgHourStatRange.end,
        }
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
          data: this.passengerHourStatData[0],
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
          data: this.passengerHourStatData[1],
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
          data: this.passengerHourStatData[2],
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

  //查询
  searchQueryData() {
    this.initChart();
  }

  //重置
  resetQueryData() {
    this.statisticsService.initPageQuery();
    this.initChart();
  }

  //导出excel表格
  getExcel(fileName, customUrl) {
    this.statisticsService.exportExcel(fileName, customUrl);
  }

  ngOnDestroy() {
    if(this.statisticsService.sharedServiceSubscription){
      this.statisticsService.sharedServiceSubscription.unsubscribe();
    }
  }
}
