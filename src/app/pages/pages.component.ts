import {Component, OnInit, Inject, ElementRef, Renderer2, ChangeDetectorRef, Input} from '@angular/core';
import {Router} from "@angular/router";
import {SharedService,TokenService,PermissionService,NzTreeNode} from "../framework";
import {MenuService,CommonEnum,DataTableService} from "../common";
@Component({
  selector: 'ng-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  isVisible:boolean = false;   //用户信息-设置弹窗显示隐藏
  userInfoBox = false;
  userInfoBoxClick = false;
  modalTitle={label: "", value: null};   //用户信息-设置
  setparamsTerminal: any;   //用户信息-设置记录航站楼信息
  documentClickListener: any;
  items: any;
  searchItems:any;
  searchItemsTemp:any;
  searchItem:string;
  _isCollapsed = false;
  _showMessage = false;
  //用户信息
  userDetails: any;
  get isCollapsed() {
    return this._isCollapsed;
  }

  set isCollapsed(isCollapsed: boolean) {
    this._isCollapsed = isCollapsed;
    this.sharedService.send({desc:this.commonEnum.descEnum.MENUCOLLAPSED.value,data:isCollapsed})
  }

  set showMessage(showMessage:boolean){
    if(showMessage==this._showMessage){
      return;
    }
    this._showMessage=showMessage;
  }

  get showMessage(){
    return this._showMessage;
  }

  constructor(private router: Router,
              private el: ElementRef,
              private renderer: Renderer2,
              private cd: ChangeDetectorRef,
              public readonly sharedService: SharedService,
              public readonly commonEnum: CommonEnum,
              public dataTableService: DataTableService,
              private readonly menuService: MenuService,
              @Inject('APP_NAME') public readonly APP_NAME: string,
              @Inject('APP_VERSION') public readonly APP_VERSION: string,
              public readonly tokenService: TokenService,
              public readonly permissionService: PermissionService,) {
    this.tokenService.getUserDetailsFromLocalStorge().subscribe(userInfo => {
      this.userDetails = userInfo.value;
    });
  }
  ngOnInit() {
    this.commonEnum.initData();
    this.items = this.permissionService.menuDatas;
    //获取到菜单资源（异步加载）
    this.permissionService.onMenuDatas().subscribe(value => {
      this.items=value;
      this.menuService.replaceAllItems(this.items);
    })
    this.menuService.replaceAllItems(this.items);
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  userInfoBoxChange() {
    this.userInfoBox = !this.userInfoBox;
    this.userInfoBoxClick = true;
    this.bindDocumentClickListener();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (!this.userInfoBoxClick && this.userInfoBox) {
          this.userInfoBox = false;
        }
        this.userInfoBoxClick = false;
        this.cd.detectChanges();
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  logout() {
    this.router.navigateByUrl('auth/logout');
  }

  uptpsd() {
    this.router.navigate([{outlets: {reset: ['uptpsd']}}], {skipLocationChange: true});
    this.sharedService.send({desc: this.commonEnum.descEnum.UPTPSD.value, data: {}})
  }

  setparams() {
    this.isVisible = true;
    this.setparamsTerminal=this.commonEnum.terminalListEnum.DEFAULT;
    this.modalTitle.label = "系统参数设置";
    this.modalTitle.value = true;
  }
  handleOk = (e) => {
    this.isVisible = false;
    if(this.setparamsTerminal){
      localStorage.setItem(this.commonEnum.terminalListEnum.LOCALSTORAGEKEY,this.setparamsTerminal);
    }else{
      localStorage.removeItem(this.commonEnum.terminalListEnum.LOCALSTORAGEKEY);
    }

  };
  handleCancel = (e) => {
    this.isVisible = false;
  };

  //显示Message页面
  toMessagePage(){
    this.showMessage = !this.showMessage;
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }
}
