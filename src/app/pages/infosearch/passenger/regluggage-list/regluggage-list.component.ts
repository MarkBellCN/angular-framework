import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,QueryInit,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-regluggage-list',
  templateUrl: './regluggage-list.component.html',
  styleUrls: ['./regluggage-list.component.css']
})

export class RegluggageListComponent implements OnInit {
  isShowInfo: boolean = false;// 控制旅客旅客交运行李列表详情的显示和隐藏
  datepickerUtil: DatepickerUtil;
  fileList=[];
  title: string = "交运行李记录";
  private _data: any;
  public regluggagedList:Array<any>=[];  //旅客交运行李列表
  public regluggageInfo: any;   //点击的某条记录对应的详情；
  
  desc: string;

  constructor(
    public dataTableService: DataTableService,
    private sharedService: SharedService,
    public acrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    
    
  }
  set data(data: any){
    this._data = data;
    let url=this.dataTableService.restService.baseUrl+'/queryRegLuggageByPasenger';
    this.dataTableService.restService.restRequest(this.data||{},url).subscribe(result=>{
        this.regluggagedList = [];
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.regluggagedList = result.data;
        }
    })
  }

  @Input() get data(){
    return this._data;
  }

  

  toRegluggageInfo(item){
    this.isShowInfo = true;
    this.regluggageInfo = item;
  }
  toBackList(){
    this.isShowInfo = false;
  }
   //列的值根据枚举中取值显示
   colTemplateFunction(tableField:any){
    if(tableField=="psgGender"){
      let result="";
      this.dataTableService.commonEnum.genderEnum.DATAS.forEach(value=>{
        if(value.value==this.data[tableField]){
          result=value.label;
        }
      })
      return result;
    }else if(tableField=="afSharetype"){
      let result="";
      this.dataTableService.commonEnum.AfSharetypeEnum.INPUTDATAS.forEach(value=>{
        if(value.value==this.data[tableField]){
          result=value.label;
        }
      })
      return result;
    }else{
      return null;
    }
  }


}




