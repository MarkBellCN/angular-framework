import * as moment from 'moment';
import * as dateUtil from 'date-fns'
import {Data} from "@angular/router";
/**
 * @Author: MarkBell
 * @Description:开始结束日期关联的工具类，需要手动New才可以使用，一个页面有多个开始结束日期需要关联，则定义多个变量，new多次。
 * @Date 2018/5/19
 */
export class DatepickerUtil {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  public formatDateToString(date:Date,format:string){
    return dateUtil.format(date, format);
  }

  public static formatStringToDate(date:string){
    let result:Date=dateUtil.parse(date);
    return result;
  }
}
