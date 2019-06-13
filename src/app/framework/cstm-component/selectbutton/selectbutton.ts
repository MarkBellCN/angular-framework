/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {NgModule,Component,Input,Output,forwardRef,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/selectitem'
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
export const SELECTBUTTON_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButton),
  multi: true
};
@Component({
  selector: 'ui-selectbutton',
  template: `
    <div [class]="styleClass" [ngClass]="disabled?'':''" [ngStyle]="style">
      <a *ngFor="let item of model" routerLink="routeLink" (click)="itemClick(item.value)" href="javascript:;" 
         ngClass="{{item.value==selectValue?'active':''}}"><i *ngIf="item.icon" [class]="item.icon"></i>{{item.label}}
      </a>
    </div>
  `,
  providers: [DomHandler,SELECTBUTTON_VALUE_ACCESSOR]
})
export class SelectButton implements ControlValueAccessor {
  @Input() model: SelectItem[];
  @Input() routeLink: string;
  @Input() disabled: boolean;
  @Input() style: any;
  @Input() styleClass: string;
  @Output() selectValueChange: EventEmitter<any> = new EventEmitter();
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  _selectValue:any;
  @Input() get selectValue(): any {
    return this._selectValue;
  }
  set selectValue(val: any) {
    let valStr=val as string;
    if(valStr!='0'&&val==''){
      val=null;
    }
    this._selectValue = val;
    this.selectValueChange.emit(val)
  }

  itemClick(value){
    if(this.disabled) return false;
    this.updateModel(value);
  }

  updateModel(value) {
    this.selectValue = value;
    this.onModelChange(this.selectValue);
  }

  writeValue(value) {
    this.selectValue = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
@NgModule({
  imports: [CommonModule],
  exports: [SelectButton],
  declarations: [SelectButton]
})
export class SelectButtonModule { }
