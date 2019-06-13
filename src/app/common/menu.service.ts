import {Injectable, Inject} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {MenuItem} from '../framework';
/**
 * 用RxJS实现菜单数据变动和获取数据
 * @type {ReplaySubject}
 */
const itemClick$ = new ReplaySubject(1);//菜单被点击
const addItems$ = new ReplaySubject(1);//添加一个新的菜单
const replaceAllItems$ = new ReplaySubject(1);//添加一个新的菜单
const navigateHome$ = new ReplaySubject(1);//导航到首页
const getSelectedItem$ = new ReplaySubject(1);//获取选中的菜单
const itemSelect$ = new ReplaySubject(1);//选中某个菜单
const itemHover$ = new ReplaySubject(1);//获取焦点
const submenuToggle$ = new ReplaySubject(1);//子菜单事件Toggle
const menuToggle$ = new ReplaySubject(1);//菜单事件Toggle
const siderTrigger$ = new ReplaySubject(1);//sider的Trigger
@Injectable()
export class MenuService {

  addItems(items: MenuItem[], tag?: string) {
    addItems$.next({tag, items});
  }

  replaceAllItems(items: MenuItem[], tag?: string) {
    replaceAllItems$.next({tag, items});
  }

  siderTrigger(value) {
    siderTrigger$.next(value);
  }

  navigateHome(tag?: string) {
    navigateHome$.next({tag});
  }

  menuToggle(data: any, tag?: string) {
    menuToggle$.next({tag, data});
  }

  getSelectedItem(tag?: string): Observable<any> {
    const listener = new BehaviorSubject<any>(null);
    getSelectedItem$.next({tag, listener});
    return listener.asObservable();
  }

  onItemClick(): Observable<any> {
    return itemClick$.publish().refCount();
  }

  onItemSelect(): Observable<any> {
    return itemSelect$.publish().refCount();
  }

  onItemHover(): Observable<any> {
    return itemHover$.publish().refCount();
  }

  onSubmenuToggle(): Observable<any> {
    return submenuToggle$.publish().refCount();
  }

  onSiderTrigger(): Observable<any> {
    return siderTrigger$.asObservable();
  }
}
@Injectable()
export class MenuInternalService {
  private items: MenuItem[] = [];

  constructor(private router: Router, private location: Location) {
    this.items = [];
  }

  getItems(): MenuItem[] {
    return this.items;
  }

  prepareItems(items: MenuItem[]) {
    items.forEach(i => this.setParent(i));
    items.forEach(i => this.prepareItem(i));
  }

  resetItems(items: MenuItem[]) {
    items.forEach(i => this.resetItem(i));
  }

  collapseAll(items: MenuItem[], except?: MenuItem) {
    items.forEach(i => this.collapseItem(i, except));
  }

  onAddItems(): Observable<any> {
    return addItems$.publish().refCount();
  }

  onReplaceAllItems(): Observable<any> {
    return replaceAllItems$.publish().refCount();
  }

  onNavigateHome(): Observable<any> {
    return navigateHome$.publish().refCount();
  }

  onMenuToggle(): Observable<any> {
    return menuToggle$.publish().refCount();
  }

  onGetSelectedItem(): Observable<any> {
    return getSelectedItem$.publish().refCount();
  }

  itemHover(item: MenuItem, tag?: string) {
    itemHover$.next({tag, item});
  }

  submenuToggle(item: MenuItem, tag?: string) {
    submenuToggle$.next({tag, item});
  }

  itemSelect(item: MenuItem, tag?: string) {
    itemSelect$.next({tag, item});
  }

  itemClick(item: MenuItem, tag?: string) {
    itemClick$.next({tag, item});
  }

  private resetItem(item: MenuItem) {
    item.selected = false;

    item.items && item.items.forEach(child => {
      this.resetItem(child);
    });
  }

  private collapseItem(item: MenuItem, except?: MenuItem) {
    if (except && item === except) {
      return;
    }
    item.expanded = false;

    item.items && item.items.forEach(child => {
      this.collapseItem(child);
    });
  }

  private setParent(item: MenuItem) {
    item.items && item.items.forEach(child => {
      child.parent = item;
      this.setParent(child);
    });
  }

  private prepareItem(item: MenuItem) {
    item.selected = false;

    const exact: boolean = item.pathMatch === 'full';
    const location: string = this.location.path();

    if ((exact && location === item.routerLink) || (!exact && location.includes(item.routerLink))
      || (exact && item.fragment && location.substr(location.indexOf('#') + 1).includes(item.fragment))) {

      item.selected = true;
      this.selectParent(item);
    }

    item.items && item.items.forEach(child => {
      this.prepareItem(child);
    });
  }

  private selectParent(item: MenuItem) {
    const parent = item.parent;
    if (parent) {
      parent.selected = true;
      parent.expanded = true;
      this.selectParent(parent);
    }
  }
}
