import {
  NgModule,
  Directive,
  ElementRef,
  Renderer,
  HostListener,
  Output,
  Input,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  Injectable,
  OnDestroy, OnInit, AfterViewInit, AfterViewChecked, ViewChild, ViewChildren, forwardRef, Inject, AfterContentChecked
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router,UrlTree} from "@angular/router";
import {SharedService} from "../../framework/common/shared.service"
import {NzBreakPoinit} from "../ui-component";
import {PermissionService} from "../auth/service/permission.service";
import {FormGroup} from "@angular/forms";
import {NzTableComponent} from "../ui-component/components/table/nz-table.component";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/**
 * 获取焦点后转换密码框
 */
@Directive({
  selector:'[inputToPassword]'
})
export class InputToPassword {
  constructor(
    public el:ElementRef,
    public renderer: Renderer
  ){

  }
  @HostListener('focus',['$event'])
  focusEvent(event) {
    this.renderer.setElementAttribute(this.el.nativeElement,"type","password")
  }
  @HostListener('blur',['$event'])
  blurEvent(event) {
    if(event.target.value==null||event.target.value==""){
      this.renderer.setElementAttribute(this.el.nativeElement,"type","text")
    }
  }
}

/**
 * 回车查询
 */
@Directive({
  selector:'[enterSearch]'
})
export class EnterSearch {
  private _ngModel: string;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  @Input()
  get ngModel(){
    return this._ngModel;
  }
  set ngModel(ngModel:any){
    this._ngModel=ngModel;
    if(ngModel){
      this.ngModelChange.emit(ngModel);
    }
  }
  constructor(
    public el:ElementRef,
    public renderer: Renderer
  ){
  }
  @HostListener('keyup',['$event'])
  keyupEvent(event) {
    if(event.keyCode=='13'){
      if(this.ngModel){
        this.ngModel=this.ngModel.toString().trim();
      }
      EnterSearchEvent.enterSearchShare.emit();
    }
  }

  @HostListener('blur',['$event'])
  blurEvent(event) {
    if(this.ngModel){
      this.ngModel=this.ngModel.trim();
    }
  }
}

/**
 * 回车查询方法
 */
@Directive({
  selector:'[enterSearchEvent]'
})
export class EnterSearchEvent{
  //支持外部调用
  public static enterSearchShare:EventEmitter<any>= new EventEmitter;
  //页面指定查询事件
  @Output() enterSearch:EventEmitter<any> = new EventEmitter;
  constructor(
    public el:ElementRef,
    public renderer: Renderer
  ){
    //将页面指定的查询事件赋值给外部可以调用
    EnterSearchEvent.enterSearchShare=this.enterSearch;
  }
}

/**
 * 打开新窗口
 */
@Directive({
  selector:'[openRouterLink]',
})
export class OpenRouterLink{
  @Input() queryParams: {[k: string]: any};
  @Input() openNewWindow:boolean;
  @Input() target;
  @Input() title;
  @Input() fragment: string;
  @Input() preserveFragment: boolean;
  @Input() queryParamsHandling:any;
  @Input() skipLocationChange: boolean;
  @Input() replaceUrl: boolean;
  @Input() acrouter: ActivatedRoute;
  private commands: any[] = [];
  private preserve: boolean;
  constructor(
    public el:ElementRef,
    public renderer: Renderer,
    private router: Router,
    public sharedService:SharedService
  ){

  }
  @Input()
  set openLink(commands: any[]|string) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  @HostListener('click',['$event'])
  clickEvent(event){
    if(this.openNewWindow){
      //获取当前窗口的连接
      let strRegex = "(.html|.htm)$";
      let re=new RegExp(strRegex);
      let currWinDocLoc=window.document.location;
      let baseUrl="";
      let openUrl="";
      if(this.commands&&this.commands.length>0&&re.test(this.commands[0])){
        baseUrl=currWinDocLoc.protocol+'//'+currWinDocLoc.host+'/';
        openUrl=this.commands[0]
      }else{
        baseUrl=currWinDocLoc.protocol+'//'+currWinDocLoc.host+'/#'
        openUrl=this.router.serializeUrl(this.urlTree)
      }
      if(this.title){

      }
    }else{
      let openUrl="";
      openUrl=this.router.serializeUrl(this.urlTree)
      this.router.navigateByUrl(openUrl);
    }

  }
  //利用router生成UrlTree
  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.acrouter,
      queryParams: this.queryParams,
      fragment: this.fragment,
      preserveQueryParams: this.attrBoolValue(this.preserve),
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: this.attrBoolValue(this.preserveFragment),
    });
  }
  attrBoolValue(s: any): boolean {
    return s === '' || !!s;
  }
}


/**
 * 跳到首页
 */
@Directive({
  selector:'[skipIndex]'
})
export class SkipIndex {
  constructor(
    public el:ElementRef,
    private permissionService: PermissionService,
    public renderer: Renderer
  ){
  }
  @HostListener('click',['$event'])
  clickEvent(event) {
    this.permissionService.skipIndexUrl();
  }
}

/**
 * 响应式
 */
@Directive({
  selector:'[reactive]',
})
export class Reactive{
  _dimensionMap = {
    xl: '1600px',
    lg: '1200px',
    md: '992px',
    sm: '768px',
    xs: '480px',
  };
  @Input() reactive: NzBreakPoinit;
  @Input() nzBreakpoint: NzBreakPoinit;
  @Output() reactiveChange = new EventEmitter();
  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    if (this.nzBreakpoint) {
      const matchBelow = window.matchMedia(`(max-width: ${this._dimensionMap[ this.nzBreakpoint ]})`).matches;
      this.reactiveChange.emit(matchBelow);
    }
  }
}
/**
 * 图片等比缩放
 */
@Directive({
  selector:'[imgReactive]',
})
export class ImgReactive implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked{
  imgParent: any;
  imgPreview: any;
  imgInit=false;
  constructor(
    public el:ElementRef,
    public renderer: Renderer,
  ){

  }
  ngOnInit() {
    this.imgPreview = <HTMLDivElement> this.el.nativeElement;
    this.imgParent=<HTMLDivElement> this.el.nativeElement.parentElement;
  }

  ngAfterViewInit() {
    this.reactive();
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {

  }

  reactive(){
    if (this.imgPreview&&!this.imgInit) {
      let image = new Image();
      let maxWidth = this.imgParent.offsetWidth;
      let maxHeight = this.imgParent.offsetHeight;
      //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
      let imgSrc= this.imgPreview.getAttribute("src");
      if(!imgSrc){
        return;
      }
      image.src = imgSrc;
      // 当图片比图片框小时不做任何改变
      if (image.width < maxWidth && image.height < maxHeight) {
        this.imgPreview.setAttribute("width", image.width + "px");
        this.imgPreview.setAttribute("height", image.height + "px");
      } else {
        //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
        if (maxWidth / maxHeight <= image.width / image.height) {
          //原图片宽高比例 大于 图片框宽高比例
          this.imgPreview.setAttribute("width", maxWidth + "px");//以框的宽度为标准
          this.imgPreview.setAttribute("height", maxWidth * (image.height / image.width) + "px");
        }
        else {
          //原图片宽高比例 小于 图片框宽高比例
          this.imgPreview.setAttribute("width", maxHeight * (image.width / image.height) + "px");//以框的高度为标准
          this.imgPreview.setAttribute("height", maxHeight + "px");
        }
      }
      this.imgInit=true;
    }
  }
}


/**
 * 失去焦点对formControl Trim
 */
@Directive({
  selector: '[formControlName]',
})
export class FormControlNameTrim implements OnInit {
  @Input() formControlName:string;
  constructor(public el: ElementRef,
              public sharedService:SharedService,
              public renderer: Renderer) {
  }
  ngOnInit() {
  }

  @HostListener('blur',['$event'])
  blurEvent(event) {
    this.sharedService.send({desc:'blurEvent',data:this.formControlName,targetComponent:'FormGroupTrim'})
  }
}

/**
 * Trim处理
 */
@Directive({
  selector: 'form',
})
export class FormGroupTrim implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  private sharedServiceSubscription:any;
  @Input() formGroup:FormGroup;
  constructor(public el: ElementRef,
              public sharedService:SharedService,
              public renderer: Renderer) {
  }

  ngOnInit() {
    this.sharedServiceSubscription=this.sharedService.observable.subscribe(data=>{
      if(data.desc=='blurEvent'&&data.targetComponent=='FormGroupTrim'){
        if (this.formGroup&&this.formGroup.value[data.data]){
          this.formGroup.controls[data.data].setValue(this.formGroup.value[data.data].trim());
        }
      }
    })
  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    if(this.sharedServiceSubscription){
      this.sharedServiceSubscription.unsubscribe();
    }
  }
}

@Directive({
  selector: '[keyEventSelectData]'
})
export class KeyEventSelectData {
  public static iskeydown=false;

  constructor(public el: ElementRef,
              public renderer: Renderer,
              public sharedService: SharedService,) {
    document.onkeydown=null;
    document.onkeydown=(event)=>{
      if (event.keyCode == 38) {
        if(!KeyEventSelectData.iskeydown){
          this.sharedService.send({desc: 'keyEventSelectDataUp',data: null});
        }else{
          event.preventDefault();
        }
        KeyEventSelectData.iskeydown=true;
      }
      if (event.keyCode == 40) {
        if(!KeyEventSelectData.iskeydown){
          this.sharedService.send({desc: 'keyEventSelectDataDown',data: null});
        }else{
          event.preventDefault();
        }
        KeyEventSelectData.iskeydown=true;
      }
    }
    document.onkeyup=(event)=>{
      if (event.keyCode == 38) {
        setTimeout(()=>{
          KeyEventSelectData.iskeydown=false;
        },300);
      }
      if (event.keyCode == 40) {
        setTimeout(()=>{
          KeyEventSelectData.iskeydown=false;
        },300);
      }
    }
  }
}



/**
 * 对NZ-TABLE二次处理
 */
@Directive({
  selector: '[nz-table-reactive]',
})
export class TableReactive implements OnInit, AfterViewInit {
  @Input() tableButtom:number=30;
  nzTableParentEle: any;
  nzTableEle: any;
  private sharedServiceSubscription:any;
  constructor(
              @Inject(forwardRef(() => NzTableComponent)) public table: NzTableComponent,
              public el: ElementRef,
              public sharedService:SharedService,
              public renderer: Renderer) {
    this.nzTableEle = <HTMLDivElement> this.el.nativeElement;
    this.nzTableParentEle=<HTMLDivElement> this.el.nativeElement.parentElement;
  }

  ngOnInit() {
    this.sharedServiceSubscription=SchRange.observable.subscribe(data=>{
      setTimeout(()=>{
        this.setNzScroll();
      },10)
    });
  }

  @HostListener('window:resize', [ '$event' ])
  onWindowResize(e: UIEvent): void {
    this.setNzScroll();
  }

  ngAfterViewInit() {
    this.setNzScroll();
  }

  private setNzScroll(){
    let bodyH=document.body.offsetHeight;
    let topOptEle:any=document.getElementsByClassName("top-opt")[0];
    let topSchEle:any=document.getElementsByClassName("top-sch")[0];
    let conTableTitleEle:any=document.getElementsByClassName("con-table-title")[0];
    if(topOptEle&&topSchEle&&conTableTitleEle){
      let topOptEleH=topOptEle.offsetHeight;
      let topSchEleH=topSchEle.offsetHeight;
      let conTableTitleEleH=conTableTitleEle.offsetHeight;
      let tableH=bodyH-topOptEleH-topSchEleH-conTableTitleEleH-this.tableButtom - 20;
      this.table.nzScroll={ x: 0, y: tableH };
    }
  }
}

/**
 * 展开搜索条件
 */
@Directive({
  selector: '.sch-area-input-range',
})
export class SchRange implements OnInit, AfterViewInit, OnDestroy {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return SchRange.subject.asObservable();
  }
  //发送数据
  private static send(data:any){
    SchRange.subject.next(data);
  }
  constructor(
    public el: ElementRef,
    public renderer: Renderer) {
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    SchRange.send({});
  }

  ngOnDestroy() {
    SchRange.send({});
  }
}



@Injectable()
export class CustomDirectiveService {

}

@NgModule({
  imports: [CommonModule],
  exports: [EnterSearch,EnterSearchEvent,OpenRouterLink,InputToPassword,Reactive,SkipIndex,ImgReactive,FormGroupTrim,FormControlNameTrim,TableReactive,KeyEventSelectData,SchRange],
  declarations: [EnterSearch,EnterSearchEvent,OpenRouterLink,InputToPassword,Reactive,SkipIndex,ImgReactive,FormGroupTrim,FormControlNameTrim,TableReactive,KeyEventSelectData,SchRange]
})
export class CustomDirectiveModule { }
