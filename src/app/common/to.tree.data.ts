/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/5/9
 */
import {NzTreeNodeOptions,NzTreeNode} from "../framework"

export interface ToTreeDataParams {
  source: Array<any>;
  idName: string;
  pIdName: string;
  title: string;
}

export class ToTreeData {
  public static createTreeNode(params: ToTreeDataParams):any{
    let nodes=[];
    let nodeOptions=ToTreeData.toTreeNodeOptions(params);
    nodeOptions.forEach(nodeOption=>{
      nodes.push(new NzTreeNode(nodeOption));
    })
    return nodes;
  }

  public static toTreeNodeOptions(params: ToTreeDataParams):any {
    let nodes:NzTreeNodeOptions[]=new Array();
    for(let i=0;i<params.source.length;i++){
      if(params.source[i][params.pIdName]==null){
        let root =params.source[i];
        let node:NzTreeNodeOptions={title:root[params.title],key:root[params.idName]};
        node.sourceData=root;
        node.children=ToTreeData.findAllChildrensNodeOptions(params.source,root,params.idName,params.pIdName,params.title);
        if(node.children.length==0){
          node.isLeaf=true;
        }else{
          node.isLeaf=false;
        }
        nodes.push(node);
      }
    }
    return nodes;
  }

  private static findAllChildrensNodeOptions(data:Array<any>,node:any,idName:string,pIdName:string,title:string):any{
    let childrens:NzTreeNodeOptions[]=new Array<any>();
    for(let i=0;i<=data.length;i++){
      if(i==data.length){
        return childrens;
      }
      if(data[i][pIdName]==null){
        continue;
      }
      if(data[i][pIdName]==node[idName]){
        let nodetemp=data[i];
        let child:NzTreeNodeOptions={title:nodetemp[title],key:nodetemp[idName]};
        child.children=this.findAllChildrensNodeOptions(data,nodetemp,idName,pIdName,title);
        child.sourceData=nodetemp;
        if(child.children.length==0){
          child.isLeaf=true;
        }else{
          child.isLeaf=false;
        }
        childrens.push(child);
      }
    }
  }
}
