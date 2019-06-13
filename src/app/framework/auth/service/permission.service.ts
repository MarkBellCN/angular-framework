import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {Router} from '@angular/router';
import {HttpService, API_URL} from "../../common/http.service";
import {MenuItem} from "../../common/menuitem";
import {ResponseData} from "../../common/response.data";
import {ResultEnum, SysResTypeEnum} from "../../common/enum";
import {ReplaySubject} from "rxjs/ReplaySubject";
const menuDatas$ = new ReplaySubject(1);//获取到菜单，向外发送。
@Injectable()
export class PermissionService {
  //权限
  public permissionObj: any;
  //这个是菜单权限
  private _menuDatas: MenuItem[];
  //这个是所有的权限数据，未分类
  private _sourceDatas: any;
  private _menuSourceDatas: any[];

  get menuDatas(): any {
    let returnDatas;
    if (this._menuDatas) {
      returnDatas = this._menuDatas;
    } else {
      returnDatas = JSON.parse(localStorage.getItem(this.apiUrl + "/menuData"));
    }
    return returnDatas;
  }

  set menuDatas(value: any) {
    this._menuDatas = value;
    menuDatas$.next(JSON.parse(JSON.stringify(value)));
    localStorage.setItem(this.apiUrl + "/menuData", JSON.stringify(value))
  }

  get sourceDatas(): any {
    let sourceDatas;
    if (this._sourceDatas) {
      sourceDatas = this._sourceDatas;
    } else {
      sourceDatas = JSON.parse(localStorage.getItem(this.apiUrl + "/sourceDatas"));
    }
    return sourceDatas;
  }

  set sourceDatas(value: any) {
    this._sourceDatas = value;
    localStorage.setItem(this.apiUrl + "/sourceDatas", JSON.stringify(value))
  }

  get menuSourceDatas(): any {
    let menuSourceDatas;
    if (this._menuSourceDatas) {
      menuSourceDatas = this._menuSourceDatas;
    } else {
      menuSourceDatas = JSON.parse(localStorage.getItem(this.apiUrl + "/menuSourceDatas"));
    }

    return menuSourceDatas;
  }

  set menuSourceDatas(value: any) {
    this._menuSourceDatas = value;
    localStorage.setItem(this.apiUrl + "/menuSourceDatas", JSON.stringify(value))
  }

  onMenuDatas(): Observable<any> {
    return menuDatas$.publish().refCount();
  }

  constructor(
    public httpService: HttpService,
    private router: Router,
    @Inject(API_URL) public readonly apiUrl: string,) {

  }

  //清空资源
  clean() {
    localStorage.removeItem(this.apiUrl + "/sourceDatas");
    localStorage.removeItem(this.apiUrl + "/menuSourceDatas");
    localStorage.removeItem(this.apiUrl + "/menuData");
    localStorage.removeItem(this.apiUrl + "/navMenuDatas");
  }

  //获取通过url操作权限
  getQx(url) {
    return this.getQxFromUrl(url);
  }

  //判断是否有该权限
  hasMenuByUrl(url) {
    if (this.menuSourceDatas) {
      for (let i = 0; i < this.menuSourceDatas.length; i++) {
        if (this.menuSourceDatas[i].url && this.menuSourceDatas[i].url.includes(url)) {
          return true;
        }
      }
    }
    return false;
  }

  //加载权限资源
  queryResourceByUser(id: string,callback?:any) {
    let url = this.apiUrl + "/sys/sysUser/queryResourceByUser";
    this.httpService.request("post", url, null).map((res) => {
      let result = res.body;
      return new ResponseData(
        result.code,
        result.msg,
        result.data
      )
    }).subscribe(result => {
        if (result.code == ResultEnum.SUCCESS.value) {
          if (result.data && result.data.length > 0) {
            this.sourceDatas = result.data;
            let menuArray = [];
            if (this.sourceDatas) {
              for (let i = 0; i < this.sourceDatas.length; i++) {
                if (this.sourceDatas[i] && this.sourceDatas[i].resourceType == SysResTypeEnum.MENU.value) {
                  menuArray.push(this.sourceDatas[i]);
                }
              }
            }
            this.menuSourceDatas = menuArray;
            this.toTreeData(menuArray);
          }
          if(callback){
            callback();
          }
        }
      }
    )
  }

  //进入PAGES自动跳转
  skipIndexUrl() {
    if (this.menuSourceDatas&&this.menuSourceDatas.length>0) {
      for (let i = 0; i < this.menuSourceDatas.length; i++) {
        if (this.menuSourceDatas[i]['path']&&this.menuSourceDatas[i]['path'].toString().toUpperCase().includes('INDEX')) {
          this.router.navigateByUrl('/pages/'+this.menuSourceDatas[i]['path']);
          break;
        }
      }
    }else{
      this.router.navigateByUrl('/auth');
    }
  }

  //登录后跳转
  loginRedirect() {
    if(this.menuSourceDatas&&this.menuSourceDatas.length>0){
      this.router.navigateByUrl('/pages');
    }
  }

  private getQxFromUrl(url: string) {
    //构造类似的json格式
    /**
     * {
     *    "add":"true",
     *    "edit":"false",
     *    "delete":"true",
     *    "export":"true",
     *    "import":"true",
     *    .....
     * }
     */
      //得到此url对应的resource_id
    let obj = {};
    let id;
    if (this.menuSourceDatas) {
      for (let i = 0; i < this.menuSourceDatas.length; i++) {
        if ((this.menuSourceDatas[i].url) == url) {
          if (this.menuSourceDatas[i].id) {
            id = this.menuSourceDatas[i].id;
            break;
          }
        }
      }
      //寻找pid为resource_id的数据
      if (id != "") {
        for (let i = 0; i < this.sourceDatas.length; i++) {
          if (!this.sourceDatas[i]) {
            continue;
          }
          if (this.sourceDatas[i].pid == id && this.sourceDatas[i].resourceType == SysResTypeEnum.BUTTON.value) {
            //获取到了 ,此时是按钮权限，url对应的是add,delete,update....
            obj[this.sourceDatas[i].url] = true;
          }
        }
      }

    }
    return obj;
  }

  //获取菜单树
  toTreeData(source: any) {
    let nodes: MenuItem[] = new Array();
    for (let i = 0; i < source.length; i++) {
      //如果pid为空则为根节点,然后获取所有子节点
      if (source[i].pid == null) {
        //一个节点模型
        let node: MenuItem = {};
        //根节点数据
        let root = source[i];
        let items = this.findAllChildrens(source, root);
        if (items && items.length > 0) {
          node.items = items;
        }
        node.label = root.name;
        node.icon = root.icon;
        node.parent = null;
        node.data = root;
        if (!node.items||node.items.length == 0) {

        } else {

        }
        node.expanded = false;
        nodes.push(node);
      }
    }
    this.menuDatas = nodes;
  }

  findAllChildrens(data: Array<any>, node: any): any {
    let childrens: MenuItem[] = new Array<any>();
    for (let i = 0; i <= data.length; i++) {
      if (i == data.length) {
        return childrens;
      }
      if (data[i].pid == null) {
        continue;
      }
      //如果是孩子节点则进行递归
      if (data[i].pid == node.id) {
        //一个节点模型
        let child: MenuItem = {};
        //节点数据
        let nodetemp = data[i];
        let items = this.findAllChildrens(data, nodetemp);
        if (items && items.length > 0) {
          child.items = items
        }
        child.label = nodetemp.name;
        child.icon = nodetemp.icon;
        child.routerLink = nodetemp.path;
        child.parent = node;
        child.data = nodetemp;
        childrens.push(child);
      }
    }
  }
}
