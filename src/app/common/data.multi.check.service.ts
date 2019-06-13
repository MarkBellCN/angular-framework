import {Injectable} from '@angular/core';

@Injectable()
export class DataMultiCheckService {
  private datas: Array<any>;
  public checkDatas: Array<any> = [];
  public allChecked: boolean = false;
  public indeterminate: boolean = false;
  public displayButton: boolean = false;

  public checkedNumber = 0;

  constructor() {
  }

  public setDatas(datas) {
    this.checkedNumber = 0;
    this.datas = datas;
  }

  public checkAll(value) {
    if (value) {
      this.datas.forEach(data => data.checked = true);
    } else {
      this.datas.forEach(data => data.checked = false);
    }
    this.refreshStatus();
  }
  public checkOne(value) {
    if (value) {
      this.datas.forEach(data => data.checked = false);
    }
    value.checked=true;
    this.refreshStatus();
  }

  public refreshStatus() {
    if(this.datas&&this.datas.length>0){
      let allChecked = this.datas.every(value => value.checked === true);
      let allUnChecked = this.datas.every(value => !value.checked);
      this.allChecked = allChecked;
      this.indeterminate = (!allChecked) && (!allUnChecked);
      this.displayButton = !this.datas.some(value => value.checked);
      this.checkDatas = this.datas.filter(value => value.checked === true);
      this.checkedNumber = this.datas.filter(value => value.checked === true).length;
    }
  }

}
