import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-grouppassenger-details',
  templateUrl: './grouppassenger-details.component.html',
  styleUrls: ['./grouppassenger-details.component.css']
})

export class GrouppassengerDetailsComponent implements OnInit {
  datepickerUtil: DatepickerUtil;
  fileList=[];
  title: string = "旅客信息详情";
  private _grouppassengerDatas: any;
  desc: string;

  constructor(
    public dataTableService: DataTableService,
    private sharedService: SharedService,
    public acrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    
  }
  set grouppassengerDatas(data: any){
    this._grouppassengerDatas = data;
    
  }

  @Input() get grouppassengerDatas(){
    return this._grouppassengerDatas;
  }

  

   //列的值根据枚举中取值显示
   colTemplateFunction(tableField:any){
    if(tableField=="psgGender"){
      let result="";
      this.dataTableService.commonEnum.genderEnum.DATAS.forEach(value=>{
        if(value.value==this.grouppassengerDatas[tableField]){
          result=value.label;
        }
      })
      return result;
    }else if(tableField=="afSharetype"){
      let result="";
      this.dataTableService.commonEnum.AfSharetypeEnum.INPUTDATAS.forEach(value=>{
        if(value.value==this.grouppassengerDatas[tableField]){
          result=value.label;
        }
      })
      return result;
    }else{
      return null;
    }
  }


}



