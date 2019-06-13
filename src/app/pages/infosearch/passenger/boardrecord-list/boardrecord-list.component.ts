import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,QueryInit,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-boardrecord-list',
  templateUrl: './boardrecord-list.component.html',
  styleUrls: ['./boardrecord-list.component.css']
})

export class BoardrecordListComponent implements OnInit {
  isShowInfo: boolean = false;// 控制旅客登机记录列表的显示和隐藏
  datepickerUtil: DatepickerUtil;
  fileList=[];
  title: string = "登机记录";
  private _data: any;
  public boardrecordList:Array<any>=[];  //旅客登机记录列表
  public boardrecordInfo: any;   //点击的某条记录对应的详情；
  
  desc: string;

  constructor(
    public dataTableService: DataTableService,
    private sharedService: SharedService,
    public acrouter: ActivatedRoute,
  ) { }

  ngOnInit() { 
    
  }
  set data(data: any){
    this.isShowInfo = false;
    this._data = data;
    let url=this.dataTableService.restService.baseUrl+'/queryBoardRecordByPasenger';
    this.dataTableService.restService.restRequest(this._data||{},url).subscribe(result=>{
      this.boardrecordList = [];
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.boardrecordList = result.data;
        }
    })
  }

  @Input() get data(){
    return this._data;
  }


  toBoardrecordInfo(item){
    this.isShowInfo = true;
    this.boardrecordInfo = item;
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


