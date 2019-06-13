/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
export class PageQuery {
  constructor(public data: any,
              public pageNum: any,
              public pageSize: any,
              public sortMap: Array<SortItem>,) {

  }
}
export class SortItem {
  constructor(public name: string,
              public value: string,) {

  }
}

