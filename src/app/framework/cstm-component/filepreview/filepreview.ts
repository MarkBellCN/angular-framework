/**
 * Created by MarkBell on 2018/1/8.
 */
import {
  NgModule, Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Input, Output, Renderer2, Inject, forwardRef,
  ViewChild, AfterViewChecked, ViewEncapsulation, NgZone
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {HttpService} from "../../common/http.service";
import {Headers, ResponseContentType} from "@angular/http";
import {fromEvent} from "rxjs/observable/fromEvent";

@Component({
  selector: 'ui-file-preview',
  styleUrls: ['./filepreview.css'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div #container class="filepreview-panel" (click)="filePreviewEventStopPropagation($event)" [ngClass]="styleClass"
         [ngStyle]="style" [style.display]="visible ? 'block' : 'none'">
      <div class="panel-container">
        <div id="previewBox" #previewBox class="img-box">
          <img #imgPreview class="img-preview" alt="" title="" src="{{fileUrl}}"/>
        </div>
      </div>
      <div class="filepreview-panel-bottom flex flex-justify">
        <div class="flex-left g-5">
          <h5 class="font-xxl">附件预览</h5>
          <p class="font-gray">{{fileName}}</p>
        </div>
        <div class="flex flex-right flex-align-c g-5">
          <button class="" (click)="downFile()"><i class="icon img-download-white"></i> 保存图像</button>
          <button class="" (click)="hide()"><i class="anticon anticon-close"></i> 退出查看</button>
        </div>
      </div>
    </div>
  `,
  providers: [DomHandler]
})
export class FilePreview implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  @Input() style: any;

  @Input() styleClass: string;

  fileUrl: string;//文件的url包括主机、端口等信息

  fileType: string;//image:图片  video:视频  other:其他

  fileName: string;//文件名称

  _visible: boolean;

  imgDefaultWidth=500;

  imgInit=false;

  imgDefaultHeight=500;

  isDragWhell=false;//是否可以拖拽

  previousX:number=0;//前一步鼠标X的位置

  previousY:number=0;//前一步鼠标Y的位置

  filePreviewClick: boolean;

  documentClickListener: any;

  set visible(visible: boolean) {
    this._visible = visible;
  }

  get visible() {
    return this._visible;
  }

  @ViewChild('container') containerViewChild: ElementRef;

  @ViewChild('previewBox') previewBoxViewChild: ElementRef;

  @ViewChild('imgPreview') imgPreviewrViewChild: ElementRef;

  container: any;

  previewBox: any;

  imgPreview: any;

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2,private ngZone: NgZone,public readonly httpService: HttpService,) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.container = <HTMLElement> this.containerViewChild.nativeElement;
    this.previewBox = <HTMLElement> this.previewBoxViewChild.nativeElement;
    this.imgPreview = <HTMLElement> this.imgPreviewrViewChild.nativeElement;
    this.dragWhell();
    this.imgZoomBindEvent();
  }

  ngAfterViewChecked() {
    this.initImg();
  }

  //图片加载后按比例调整大小
  initImg(){
    if (this.imgPreview&&!this.imgInit) {
      let image = new Image();
      let defaultWidth = this.imgDefaultWidth;
      let defaultHeight = this.imgDefaultHeight;
      //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
      let imgSrc= this.imgPreview.getAttribute("src");
      if(!imgSrc){
        return;
      }
      image.src = imgSrc;
      //当图片比图片框小
      if (image.width < defaultWidth && image.height < defaultHeight) {
        if(image.width>=image.height){
          this.imgPreview.setAttribute("width", defaultWidth + "px");
          this.imgPreview.setAttribute("height", defaultWidth * (image.height / image.width) + "px");
        }else{
          this.imgPreview.setAttribute("width", defaultHeight * (image.width / image.height) + "px");
          this.imgPreview.setAttribute("height", defaultHeight + "px");
        }
      } else {
        //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
        if (defaultWidth / defaultHeight <= image.width / image.height) {
          //原图片宽高比例 大于 图片框宽高比例
          this.imgPreview.setAttribute("width", defaultWidth + "px");//以框的宽度为标准
          this.imgPreview.setAttribute("height", defaultWidth * (image.height / image.width) + "px");
        }
        else {
          //原图片宽高比例 小于 图片框宽高比例
          this.imgPreview.setAttribute("width", defaultHeight * (image.width / image.height) + "px");//以框的高度为标准
          this.imgPreview.setAttribute("height", defaultHeight + "px");
        }
      }
      this.imgAlginCenter(parseInt(this.imgPreview.getAttribute("width")),parseInt(this.imgPreview.getAttribute("height")));
      this.imgInit=true;
    }
  }

  imgAlginCenter(imgWidth,imgHeight){
    this.previewBox.style.left=(document.body.offsetWidth-imgWidth)/2+'px'
    this.previewBox.style.top=(document.body.offsetHeight-imgHeight)/2+'px'
  }

  /**
   * 图片缩放事件绑定
   */
  imgZoomBindEvent(){
    let eventType;
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
      eventType='DOMMouseScroll';
    } else {
      eventType='mousewheel';
    }
    this.previewBox.addEventListener(eventType, (ev) => {
      //判断放大或缩小，（ev.detail > 0） 缩小否则放大
      let delta=ev.detail ? ev.detail > 0 : ev.wheelDelta < 0;
      this.imgZoom(delta);
    });
  }

  /**
   * 图片拖拽和放大
   * 计算前一步鼠标的位置和下一步鼠标的位置，来实现
   */
  dragWhell() {
    this.imgPreview.onmousedown=(ev) => {
      this.previewBox.style.cursor = "move";
      this.previewBox.onmousemove=(ev)=>{
        let disX = 0;
        let disY = 0;
        if(!this.previousX){
          this.previousX=ev.clientX;
        }else{
          disX=ev.clientX-this.previousX;
          this.previousX=ev.clientX;
        }
        if(!this.previousY){
          this.previousY=ev.clientY;
        }else{
          disY=ev.clientY-this.previousY;
          this.previousY=ev.clientY;
        }
        this.previewBox.style.left = disX + this.previewBox.offsetLeft + 'px';
        this.previewBox.style.top = disY + this.previewBox.offsetTop + 'px';
      };
      return false;
    };
    this.imgPreview.onmouseup=(ev)=>{
      this.previousX=null;
      this.previousY=null;
      this.previewBox.style.cursor="default";
      this.previewBox.onmousemove=null;
      return false;
    }


  }



  imgZoom(delta:any){
    if(delta){
      if(this.imgPreview.offsetWidth<100||this.imgPreview.offsetHeight<100){
        return;
      }
    }else{
      if(this.imgPreview.offsetWidth>2048||this.imgPreview.offsetHeight>2048){
        return;
      }
    }
    //图片放大缩小因子
    let ratioDelta = !delta ? 1 + 0.05 : 1 - 0.05;
    //图片外层容器的位置
    let previewBoxLeft=this.previewBox.offsetLeft;
    let previewBoxTop=this.previewBox.offsetTop;
    //图片旧的宽度高度
    let imgPreviewOffsetWidth=this.imgPreview.offsetWidth;
    let imgPreviewOffsetHeight=this.imgPreview.offsetHeight;
    //图片新的宽度高度
    let w = imgPreviewOffsetWidth * ratioDelta;
    let h = imgPreviewOffsetHeight * ratioDelta;
    //图片缩放后宽度，高度改变的量
    let widthChangeValue=imgPreviewOffsetWidth-w;
    let widthChangeHeight=imgPreviewOffsetHeight-h;
    this.previewBox.style.left =(previewBoxLeft+widthChangeValue/2)+ 'px';
    this.previewBox.style.top =(previewBoxTop+widthChangeHeight/2) + 'px';
    this.imgPreview.style.width=w +'px';
    this.imgPreview.style.height=h +'px';
  }


  setFileInfo(fileUrl, fileName) {
    this.fileUrl = fileUrl;
    if (this.fileUrl) {
      let fileNameByUrl = this.fileUrl.split("/");
      let fileTypeByUrl = this.fileUrl.split(".");
      if (fileName) {
        this.fileName = fileName;
      } else {
        this.fileName = fileNameByUrl[fileNameByUrl.length - 1];
      }
      this.toImageType(fileTypeByUrl[fileTypeByUrl.length - 1]);
    }
  }

  toImageType(value) {
    if (value && (value.toLowerCase() == 'jpg' || value.toLowerCase() == 'png' || value.toLowerCase() == 'jpeg' || value.toLowerCase() == 'jpg')) {
      this.fileType = 'image';
    }
  }

  show(event: MouseEvent, fileUrl?, fileName?) {
    this.setFileInfo(fileUrl, fileName)
    this.filePreviewClick = true;
    //延时计算位置
    this.visible = true;
    this.domHandler.fadeIn(this.container, 250);
    //this.bindDocumentClickListener();
    if (event) {
      event.preventDefault();
    }
  }

  hide() {
    this.domHandler.fadeIn(this.container, 0);
    this.visible = false;
    //this.unbindDocumentClickListener();
  }

  toggle(event?: MouseEvent) {
    if (this.visible)
      this.hide();
    else
      this.show(event);
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (this.visible && ((event.button !== 2 && !this.filePreviewClick))) {
          this.hide();
        }
        this.filePreviewClick = false;
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  filePreviewEventStopPropagation(event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  //文件下载
  downFile() {
    let httpUrlReg=new RegExp("^(http|https|ftp)://([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+))?");
    let url=this.fileUrl.replace(httpUrlReg,"")
    this.httpService.downFileByUrl(url,this.fileName);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [FilePreview],
  declarations: [FilePreview],
  entryComponents: [FilePreview],
})
export class FilePreviewModule {
}
