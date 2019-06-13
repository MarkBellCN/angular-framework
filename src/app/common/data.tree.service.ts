/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/5/9
 */
import {Inject, Injectable, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzTreeNode} from "../framework"
@Injectable()
export class DataTreeService {
  public searchValue:any;
  public expandDefault:boolean = false;
  public expandKeysDefault:Array<any>;
  public selectedKeysDefault :Array<any>;
  public checkedKeysDefault :Array<any>;

  init(){
    this.expandDefault=false;
    this.expandKeysDefault=[];
    this.selectedKeysDefault=[];
    this.checkedKeysDefault=[];

  }

  keyUpSearch(event){
    this.searchValue=event.target.value;
  }


  /**
   * 获取选中节点
   * @param {NzTreeNode[]} nzTreeNodes
   * @param {Array<any>} resultNodes
   * @returns {Array<any>}
   */
  getAllCheckedNodeKey(nzTreeNodes:NzTreeNode[],resultNodes:Array<any>):Array<any>{
    if(!nzTreeNodes||nzTreeNodes.length<=0||!resultNodes){
      return resultNodes;
    }
    for(let i=0;i<nzTreeNodes.length;i++){
      let nzTreeNode=nzTreeNodes[i];
      if(nzTreeNode.isChecked||nzTreeNode.isHalfChecked){
        resultNodes.push(nzTreeNode.key);
      }
      //查找选中子节点
      if(nzTreeNode.children&&nzTreeNode.children.length>0){
        this.getAllCheckedNodeKey(nzTreeNode.children,resultNodes);
      }
    }
  }

}
