import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,QueryInit,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-verifyrecord-list',
  templateUrl: './verifyrecord-list.component.html',
  styleUrls: ['./verifyrecord-list.component.css']
})

export class VerifyrecordListComponent implements OnInit {
  isShowInfo: boolean = false;// 控制旅客验证记录详情的显示和隐藏
  datepickerUtil: DatepickerUtil;
  fileList=[];
  title: string = "验证记录";
  private _data: any;
  public verifyrecordList:Array<any>=[];  //旅客验证记录列表
  public verifyrecordInfo: any;   //点击的某条记录对应的详情；
  
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
    let url=this.dataTableService.restService.baseUrl+'/queryVerifyRecodeByPasenger';
    this.dataTableService.restService.restRequest(this.data||{},url).subscribe(result=>{
        this.verifyrecordList = [];
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.verifyrecordList = result.data;
        }
    })
    
  }

  @Input() get data(){
    return this._data;
  }

  

  toVerifyrecordInfo(item){
    this.isShowInfo = true;
    this.verifyrecordInfo = item;
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



