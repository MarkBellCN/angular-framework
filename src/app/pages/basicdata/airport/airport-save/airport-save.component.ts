import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/observable";
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {SharedService} from "../../../../framework";
import {DataTableService} from "../../../../common/data.table.service";

@Component({
  selector: 'app-airport-save',
  templateUrl: './airport-save.component.html',
  styleUrls: ['./airport-save.component.css'],
  providers:[DataTableService],
})
export class AirportSaveComponent implements OnInit {
  formModel: FormGroup;
  title: string = "";
  data: any = {};
  desc: string;

  constructor(public dataTableService: DataTableService,
              private sharedService: SharedService,
              public acrouter: ActivatedRoute,
              public router: Router,) {
  }

  ngOnInit() {
    this.formModel=null;
    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        arptCode3:['', Validators.compose([Validators.required,Validators.pattern(/^[0-9A-Z]{3}$/)]),this.uniqueValidators.bind(this)],
        arptCity: [''],
        arptBriefCh: ['', Validators.compose([Validators.required])],
        arptNameCh:String [''],
        arptBriefEn:String [''],
        arptNameEn:String [''],
        arptAttr:String [''],
      }
    );
    this.sharedService.observable.subscribe(data=>{
      if(data.service){
        this.dataTableService=data.service;
      }
      this.dataTableService.saveButtonEnable();
      if(data.desc==this.dataTableService.commonEnum.descEnum.DETAIL.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="查看机场信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.UPDATE.value){
        this.data=data.data;
        this.desc=data.desc;
        this.title="编辑机场信息";
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
      if(data.desc==this.dataTableService.commonEnum.descEnum.ADD.value){
        this.title="新增机场信息";
        this.desc=data.desc;
        this.data.arptAttr=this.dataTableService.commonEnum.airportAttrEnum.HOME.value;
        for(let key in this.formModel.value){
          this.formModel.controls[key].setValue(this.data[key]);
        }
      }
    }).unsubscribe();


    this.formModel.get("arptCode3").valueChanges.subscribe((data) => {
      if (data != data.toUpperCase()) {
        this.formModel.controls["arptCode3"].setValue(data.toUpperCase());
      }
    });
  }

  uniqueValidators(ctrl: AbstractControl): Observable<ValidationErrors|null> {
    if(ctrl.value==null){
      return null;
    }
    return this.dataTableService.restService.detail(ctrl.value).map(resp => {
      if(this.data!=null&&ctrl.value==this.data[this.dataTableService.tableKeyCode]){
        return null;
      }else if(resp.data!=null&&resp.data[this.dataTableService.tableKeyCode]!=null){
        return {uniqueValidators:true};
      }
      return null;
    });
  }

}
