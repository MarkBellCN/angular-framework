import {NgModule, Component, OnInit, Input, Output, ModuleWithProviders, EventEmitter} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CommonModule} from '@angular/common';
import {RouterModule, Router, NavigationEnd, ActivatedRoute, UrlTree} from '@angular/router';
import {AuthService, TokenService, CustomDirectiveModule, NgZorroAntdModule, MenuItem} from "../../framework";
import {FormsModule} from "@angular/forms";
import {MenuService, MenuInternalService,} from '../../common';

export class BaseMenuItem {
  constructor() {

  }

  handleClick(event, item) {
    item.expanded = !item.expanded;
    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
  }
}

@Component({
  selector: 'ui-menu',
  template: `
    <ul nz-menu class="ui-menu" [nzMode]="'inline'" nzTheme='dark' [nzInlineCollapsed]="isCollapsed">
      <li nz-submenu *ngFor="let item of model;let f=first;let l=last;" [nzOpen]="item.expanded"
          [ngClass]="(item.expanded)?'active':''"
          (nzOpenChange)="handleClick($event,item)">
        <div title class="flex flex-align-c meun-content">
          <div class="anticon">
            <i class="fa" ngClass="{{(item.icon==null||item.icon=='')?'img-icon icon-default':item.icon}} "></i>
          </div>
          <span>
            <a *ngIf="!item.routerLink" [href]="item.url||'javascript:void(0)'"
               [attr.tabindex]="item.expanded ? null : '-1'"
               [attr.target]="item.target"
               [attr.title]="item.title">{{item.label}}</a>
            <a *ngIf="item.routerLink"
               [attr.tabindex]="item.expanded ? null : '-1'" [attr.target]="item.target"
               [attr.title]="item.title">{{item.label}}</a>
          </span>
        </div>
        <ui-sub-menu *ngIf="item.items" [item]="item"></ui-sub-menu>
      </li>
    </ul>
  `,
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent extends BaseMenuItem implements OnInit {

  @Input() isCollapsed: boolean = false;

  @Input() tag: string;

  @Input() model: MenuItem[] = [];

  @Input() style: any;

  @Input() styleClass: string;

  @Input() multiple: boolean = false;

  constructor(public menuInternalService: MenuInternalService, public menuService: MenuService, public router: Router, public acrouter: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.menuInternalService.onAddItems().subscribe((data: { tag: string; items: MenuItem[] }) => {
      if (this.compareTag(data.tag)) {
        this.model.push(...data.items);
        this.menuInternalService.prepareItems(this.model);
      }
    });

    this.menuInternalService.onReplaceAllItems().subscribe((data: { tag: string; items: MenuItem[] }) => {
      if (this.compareTag(data.tag)) {
        this.model = [];
        this.model.push(...data.items);
        this.menuInternalService.prepareItems(this.model);
      }
    });

    this.menuInternalService.onNavigateHome().subscribe((data: { tag: string }) => {
      if (this.compareTag(data.tag)) {
        this.navigateHome();
      }
    });

    this.menuInternalService.onMenuToggle().subscribe((data: { tag: string; data: any }) => {
      if (this.compareTag(data.tag)) {
        this.navigateItem(data.data);
      }
    });

    this.menuInternalService.onGetSelectedItem().subscribe((data: { tag: string; listener: BehaviorSubject<{ tag: string; item: MenuItem }> }) => {
      data.listener.next({tag: this.tag, item: this.getSelectedItem(this.model)});
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menuInternalService.prepareItems(this.model);
      }
    });

    this.model.push(...this.menuInternalService.getItems());

    this.menuInternalService.prepareItems(this.model);
  }

  collapseAll() {
    for (let item of this.model) {
      if (item.expanded) {
        item.expanded = false;
      }
    }
  }

  handleClick(event, item) {
    if (item.items.length <= 0) {
      return false;
    }
    if (!this.multiple) {
      this.expandedNoItem(item);
    }
    super.handleClick(event, item);
  }

  expandedNoItem(item) {
    for (let modelItem of this.model) {
      if (item.data.id != modelItem.data.id && modelItem.expanded) {
        modelItem.expanded = false;
      }
    }
  }

  onToggleDone() {
  }

  private compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  private getSelectedItem(items: MenuItem[]): MenuItem {
    let selected = null;
    items.forEach((item: MenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.items && item.items.length > 0) {
        selected = this.getSelectedItem(item.items);
      }
    });
    return selected;
  }

  private navigateHome() {
    const homeItem = this.getHomeItem(this.model);
    this.navigateItem(homeItem);
    if (homeItem) {
      this.menuInternalService.resetItems(this.model);
      homeItem.selected = true;
      if (homeItem.routerLink) {
        this.router.navigate([homeItem.routerLink]);
      }
      if (homeItem.url) {
        window.location.href = homeItem.url;
      }
    }
  }

  private navigateItem(data) {
    if (data) {
      let item = this.getItemByDataId(this.model, data);
      if (item) {
        this.menuInternalService.resetItems(this.model);
        item.selected = true;
        if (!item.parent) {
          this.expandedNoItem(item);
          item.expanded = true;
        } else {
          this.expandedNoItem(item.parent);
          item.parent.expanded = true;
        }
        if (item.routerLink) {
          this.router.navigate([item.routerLink], {relativeTo: this.acrouter});
        }
        if (item.url) {
          window.location.href = item.url;
        }
      }
    }
  }

  private getItemByDataId(items: MenuItem[], data) {
    let itemTemp = null;
    items.forEach((item: MenuItem) => {
      if (item.data.resourceId == data.resourceId) {
        itemTemp = item;
      }
      if (item.items && item.items.length > 0 && !itemTemp) {
        itemTemp = this.getItemByDataId(item.items, data);
      }
    });
    return itemTemp;
  }

  private getHomeItem(items: MenuItem[]): MenuItem {
    let home = null;
    items.forEach((item: MenuItem) => {
      if (item.home) {
        home = item;
      }
      if (item.home && item.items && item.items.length > 0 && !home) {
        home = this.getHomeItem(item.items);
      }
    });
    return home;
  }
}

@Component({
  selector: 'ui-sub-menu',
  template: `
    <ul class="ui-sub-menu">
      <ng-template ngFor let-child [ngForOf]="item.items">
        <li *ngIf="!child.items" nz-menu-item title
            [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [routerLink]="child.routerLink"
            [routerLinkActive]="'ant-menu-item-selected active'">
          <div class="flex flex-align-c sub-meun-content">
            <div class="anticon">
              <i class="icon-circle" ngClass="{{(child.icon==null||child.icon=='')?'icon-circle':child.icon}}"></i>
            </div>
            <span>
                <a *ngIf="!child.routerLink" [href]="child.url||'javascript:void(0)'"
                   [attr.tabindex]="item.expanded ? null : '-1'"
                   [attr.target]="child.target"
                   [attr.title]="child.title">{{child.label}}</a>
                <a *ngIf="child.routerLink"
                   [attr.tabindex]="item.expanded ? null : '-1'" [attr.target]="child.target"
                   [attr.title]="child.title">{{child.label}}</a>
              </span>
          </div>
        </li>
        <li *ngIf="child.items&&child.items.length>0" nz-submenu [nzOpen]="child.expanded"
            [ngClass]="(child.expanded)?'active':''">
          <div title class="flex flex-align-c meun-content">
            <div class="anticon">
              <i class="fa" ngClass="{{(child.icon==null||child.icon=='')?'img-icon icon-default':child.icon}} "></i>
            </div>
            <span>
              <a [attr.target]="child.target" [attr.title]="child.title">{{child.label}}</a>
            </span>
          </div>
          <ui-sub-menu *ngIf="child.items" [item]="child"></ui-sub-menu>
        </li>
      </ng-template>
    </ul>
  `,
  styleUrls: ['./menu.component.css'],
})
export class SubMenuComponent extends BaseMenuItem {
  @Input() isCollapsed: boolean = false;

  @Input() item: MenuItem;

  @Input() expanded: boolean;

  constructor(public menuInternalService: MenuInternalService, public router: Router, public acrouter: ActivatedRoute) {
    super();
  }

  handleClick(event, item) {
    if (item.url || item.routerLink) {
      this.menuInternalService.itemClick(item);
    }
    super.handleClick(event, item);
  }
}

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, CustomDirectiveModule, NgZorroAntdModule],
  declarations: [MenuComponent, SubMenuComponent],
  exports: [MenuComponent, SubMenuComponent],
})
export class MenuModule {

}
