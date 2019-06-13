import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-passenger-save',
  templateUrl: './passenger-save.component.html',
  styleUrls: ['./passenger-save.component.css']
})

export class PassengerSaveComponent implements OnInit {
  isShowInfo: boolean = false;// 控制同行旅客详情的显示和隐藏
  datepickerUtil: DatepickerUtil;
  fileList=[];
  title: string = "旅客信息详情";
  selectValue: any;
  desc: string;
  private _data: any;
  public groupPasengerList: Array<any> = [];   //同行旅客列表
  public groupPasengerInfo: Array<any> = [];   //点击某条列表出现详情
  
  constructor(
    public dataTableService: DataTableService,
    private sharedService: SharedService,
    public acrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.selectValue = this.dataTableService.commonEnum.passengerTypeEnum.OWN.value;
    
  }
  set data(data: any){
    this._data = data;
    this.getGroupPassengerList(this._data);
    this.isShowInfo = false;
    
  }

  @Input() get data(){
    return this._data;
  }

  // 点击同行旅客列表的某一条进入同行旅客详情
  toGrouppassDatas(item: any){
    this.isShowInfo = true;
    this.groupPasengerInfo = item;

  }

  toBackList(){
    this.isShowInfo = false;
  }

  //点击tab按钮的时候进行切换
  getDataList(){
    this.isShowInfo = false;
  }

  //获取同行旅客列表数据
  getGroupPassengerList(data){
    this.groupPasengerList = [];
    let url=this.dataTableService.restService.baseUrl+'/queryGroupPasenger';
    this.dataTableService.restService.restRequest(data||{},url).subscribe(result=>{
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.groupPasengerList = result.data;
        }
    })
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


