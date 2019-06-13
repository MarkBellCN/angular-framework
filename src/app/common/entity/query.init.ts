/**
 * @Author: MarkBell
 * @Description: 用于初始化dataTableService的参数
 * acrouter 当前活跃路由，由Component向Service传参
 * baseUrl 向后台请求的基本地址，如'/basicdata/airport'
 * tableKeyCode 相当于ID，唯一确认一条数据
 * initSort 初始化排序的字段
 * pageQueryData 初始化查询参数
 * visibleSidebar 初始化侧栏是否显示
 * @Date 2017/11/7
 */
import {ActivatedRoute, Router} from "@angular/router";
import {SortItem} from "./page.query";
import {TableField} from "./table.field";

export interface QueryInit{
  acrouter?:ActivatedRoute;
  baseUrl?:string;
  tableKeyCode?:string;
  tableFields?:TableField[];
  initSort?:SortItem[];
  pageQueryData?:any;
  fieldUniqueData?:any;
  templetUrl?:string;
  isRefreshable?:boolean;
  isRefreshswitch?:boolean;
  loadlogo?:boolean;
  selectedDataList?:Array<any>;
  dataList?:Array<any>;
  visibleSidebar?:boolean;
  sidebarMask?:boolean;
  isSchRangeOpen?:boolean;
  refreshCall?:() => void;
  lazyLoadDataListCall?: (dataList?:any) => void;
  operateDataCall?: (dataList?:any) => void;
}
