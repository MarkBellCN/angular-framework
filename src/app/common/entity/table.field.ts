/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
export interface TableField{
  header:any;
  field?:any;
  hidden?:boolean;
  template?:boolean;
  format?:any;
  frozen?:boolean;
  sortable?:boolean;
  sortValue?:string;
  style?:any;
  classTh?:any;
  classTd?:any;
  disableExport?:boolean;
  customTemplate?:boolean;
  rowGroup?:boolean;
  rowSpan?:any;
  colSpan?:any;
  subTableField?:TableField[];
}
