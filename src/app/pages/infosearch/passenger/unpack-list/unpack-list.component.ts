import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../framework";
import {DataTableService,FileService,DatepickerUtil} from "../../../../common";

@Component({
  selector: 'app-unpack-list',
  templateUrl: './unpack-list.component.html',
  styleUrls: ['./unpack-list.component.css']
})

export class UnpackListComponent implements OnInit {
  isShowUnpackInfo: boolean = false;// 控随身行李开包制详情的显示和隐藏
  isShowHandpackInfo: boolean = false;// 控制交运行李开包详情的显示和隐藏
  datepickerUtil: DatepickerUtil;
  fileList=[];
  selectValue: any;
  titleHandPack: string = "随身行李开包";
  titleUnpack: string = "交运行李开包";

  private _data: any;

  public unpackList: any = [];  //交运行李开包列表
  public handpackList: any = [];  //随身行李开包列表
  public unpackInfo: any = {};  //交运行李开包详情
  public handpackInfo: any = {};  //随身行李开包详情

  constructor(
    public dataTableService: DataTableService,
    private sharedService: SharedService,
    public acrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.selectValue = this.dataTableService.commonEnum.unpackTypeEnum.REG.value;
    
  }

  set data(data: any){
    this._data = data;
    this.getRegunpackList(this._data);
    this.getHandunpackList(this._data);

    // 点击左边表格的某条数据是让右边的信息详情切换到列表状态
    this.isShowUnpackInfo = false;
    this.isShowHandpackInfo = false;
  }

  @Input() get data(){
    return this._data;
  }


  toUnpackInfo(item: any){
    this.isShowUnpackInfo = true;
    this.unpackInfo = item;
  }

  tohandpackInfo(item: any){
    this.isShowHandpackInfo = true;
    this.handpackInfo = item;
  }

  toBackUnpackList(){
    this.isShowUnpackInfo = false;
  }
  toBackHandpackList(){
    this.isShowHandpackInfo = false;
  }

  //点击tab按钮的时候进行切换
  getDataList(){
    // 当切换tabs栏标签时，让下面只显示列表信息
    this.isShowUnpackInfo = false;
    this.isShowHandpackInfo = false;
  }

  //获取交运行李开包记录列表数据
  getRegunpackList(data){
    let urlUnpack=this.dataTableService.restService.baseUrl+'/queryRegUnpackRecordByPasenger';
    this.dataTableService.restService.restRequest(data||{},urlUnpack).subscribe(result=>{
      this.unpackList = [];
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.unpackList = JSON.parse(JSON.stringify(result.data));
      }
    })
  }
  //获取手提行李开包记录列表数据
  getHandunpackList(data){
    let urlhandpack=this.dataTableService.restService.baseUrl+'/queryUnpackRecordByPasenger';
    this.dataTableService.restService.restRequest(data||{},urlhandpack).subscribe(result=>{
      this.handpackList = [];
      if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
        this.handpackList = JSON.parse(JSON.stringify(result.data));
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


