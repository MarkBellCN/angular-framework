import {EventEmitter} from '@angular/core';
export interface MenuItem {
  home?: boolean;
  data?:any;
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  queryParams?: { [k: string]: any };
  url?: string;
  routerLink?: any;
  openLink?: any;
  activatedRoute?:any
  items?: MenuItem[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  badge?: string;
  badgeStyleClass?: string;
  style?:any;
  styleClass?:string;
  title?: string;
  parent?: MenuItem;
  pathMatch?: string;
  fragment?: string;
}
