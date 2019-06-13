import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { CandyDate } from './lib/candy-date';

@Component({
  selector       : 'nz-picker',
  templateUrl    : './picker.component.html',
  animations     : [
    dropDownAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NzPickerComponent implements OnInit, AfterViewInit {
  @Input() isRange: boolean = false;
  @Input() open: boolean = undefined; // "undefined" = this value will be not used
  @Input() disabled: boolean;
  @Input() placeholder: string | string[];
  @Input() allowClear: boolean;
  @Input() autoFocus: boolean;
  @Input() className: string;
  @Input() format: string;
  @Input() size: 'large' | 'small';
  @Input() style: object;

  @Input() value: CandyDate | CandyDate[];
  @Output() valueChange = new EventEmitter<CandyDate | CandyDate[]>();

  @Output() openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

  @ViewChild('origin') origin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
  @ViewChild('pickerInput') pickerInput: ElementRef;

  prefixCls = 'ant-calendar';
  animationOpenState = false;
  overlayOpen: boolean = false; // Available when "open"=undefined
  overlayOffsetY: number = 0;
  overlayOffsetX: number = -2;
  overlayPositions: ConnectionPositionPair[] = [
    {
      // offsetX: -10, // TODO: What a pity, cdk/overlay current not support offset configs even though it already provide these properties
      // offsetY: -10,
      originX : 'start',
      originY : 'top',
      overlayX: 'start',
      overlayY: 'top'
    },
    {
      originX : 'start',
      originY : 'bottom',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      originX : 'end',
      originY : 'top',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      originX : 'end',
      originY : 'bottom',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ] as ConnectionPositionPair[];
  dropdownAnimation: 'top' | 'bottom' = 'bottom';
  currentPositionX: 'start' | 'end' = 'start';
  currentPositionY: 'top' | 'bottom' = 'top';
  private _valueDefault: CandyDate | CandyDate[];
  // get valueReadable(): string {
  //   return this.value && this.i18n.formatDateCompatible(this.value.nativeDate, this.format);
  // }
  get realOpenState(): boolean { // The value that really decide the open state of overlay
    return this.isOpenHandledByUser() ? this.open : this.overlayOpen;
  }

  @Input() get valueDefault(){
    return this._valueDefault;
  }

  set valueDefault(valueDefault){
    this._valueDefault=valueDefault;
    //由于双向绑定valueDefault变化和value变化有延时
    setTimeout(()=>{
      if(this.isRange&&this.isInvalid()){
        let value:Array<CandyDate>=[];
        let valueStartCandyDate=this.value[0].nativeDate;
        let valueEndCandyDate=this.value[1].nativeDate;
        let startCandyDate=new CandyDate(this.valueDefault[0]);
        let endCandyDate=new CandyDate(this.valueDefault[1]);
        startCandyDate=startCandyDate.setHms(valueStartCandyDate.getHours(),valueStartCandyDate.getMinutes(),valueStartCandyDate.getSeconds());
        endCandyDate=endCandyDate.setHms(valueEndCandyDate.getHours(),valueEndCandyDate.getMinutes(),valueEndCandyDate.getSeconds());
        value.push(startCandyDate)
        value.push(endCandyDate)
        this.value=value;
        this.valueChange.emit(this.value);
      }
    },100)
  }

  constructor(private i18n: NzI18nService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      if (this.isRange) {
        const firstInput = (this.pickerInput.nativeElement as HTMLElement).querySelector('input:first-child') as HTMLInputElement;
        firstInput.focus(); // Focus on the first input
      } else {
        this.pickerInput.nativeElement.focus();
      }
    }
  }

  // Show overlay content
  showOverlay(): void {
    if (!this.realOpenState) {
      this.overlayOpen = true;
      this.openChange.emit(this.overlayOpen);
      setTimeout(() => {
        if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
          this.cdkConnectedOverlay.overlayRef.updatePosition();
        }
      });
    }
  }

  hideOverlay(): void {
    if (this.realOpenState) {
      this.overlayOpen = false;
      this.openChange.emit(this.overlayOpen);
    }
  }

  onClickInputBox(): void {
    if (!this.disabled && !this.isOpenHandledByUser()) {
      this.showOverlay();
    }
  }

  onClickBackdrop(): void {
    this.hideOverlay();
  }

  onOverlayDetach(): void {
    this.hideOverlay();
  }

  // NOTE: A issue here, the first time position change, the animation will not be triggered.
  // Because the overlay's "positionChange" event is emitted after the content's full shown up.
  // All other components like "nz-dropdown" which depends on overlay also has the same issue.
  // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropdownAnimation = position.connectionPair.originY === 'top' ? 'bottom' : 'top';
    this.currentPositionX = position.connectionPair.originX as 'start' | 'end';
    this.currentPositionY = position.connectionPair.originY as 'top' | 'bottom';
    this.changeDetector.detectChanges(); // Take side-effects to position styles
  }

  onClickClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.value = this.isRange ? [] : null;
    this.valueChange.emit(this.value);
  }

  getReadableValue(partType?: RangePartType): string {
    let value: CandyDate;
    if (this.isRange) {
      value = this.value[ this.getPartTypeIndex(partType) ];
    } else {
      value = this.value as CandyDate;
    }
    return value ? this.i18n.formatDateCompatible(value.nativeDate, this.format) : null;
  }

  getPartTypeIndex(partType: RangePartType): number {
    return { 'left': 0, 'right': 1 }[ partType ];
  }

  getPlaceholder(partType?: RangePartType): string {
    return this.isRange&&(this.placeholder instanceof Array) ? this.placeholder[ this.getPartTypeIndex(partType) ] : this.placeholder as string;
  }

  isEmptyValue(value: CandyDate[]): boolean {
    if (this.isRange) {
      return !value || !Array.isArray(value) || value.every((val) => !val);
    } else {
      return !value;
    }
  }

  // Whether open state is permanently controlled by user himself
  isOpenHandledByUser(): boolean {
    return this.open !== undefined;
  }

  animationStart(): void {
    if (this.realOpenState) {
      this.animationOpenState = true;
    }
  }

  animationDone(): void {
    this.animationOpenState = this.realOpenState;
  }

  isInvalid(){
    if(this.valueDefault&&this.valueDefault[0]&&this.valueDefault[1]&&this.value&&this.value[0]&&this.value[1]){
      return true;
    }else{
      return false;
    }
  }
}

export type RangePartType = 'left' | 'right';
