import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataTableService, TableField, QueryInit, ToTreeData, DataTreeService, FaceService, FileService} from '../../../common';
import {SharedService,MenuItem} from '../../../framework';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers:[DataTreeService],
})

export class DepartmentComponent implements OnInit, OnDestroy {
  // 绑定卡片、取消卡片的变量
  visible:boolean;
  public isVisible:boolean = false;
  public toShowmoreMenu:boolean= false;
  public isDisabled:boolean=false;
  public overnumber:boolean = false; //绑定卡号输入的卡号是否超过30
  public modalTitle={label: "", value: null};
  public urlValue: string="";
  public inputValue: string="";
  public employeeData:any;

  public nodes: any[]=[];
  public currDept: any;
  public contextMenuItems: MenuItem[];
  public deptBaseUrl: string = '/organization/department';
  public permissionObj: any={};

  constructor(public acrouter: ActivatedRoute,
              public faceService: FaceService,
              public fileService: FileService,
              public dataTableService: DataTableService,public dataTreeService: DataTreeService,) {

  }

  ngOnInit() {
    this.permissionObj = {};
    this.permissionObj = this.dataTableService.permissionService.getQx(this.deptBaseUrl);
    this.dataTreeService.init();
    //初始化dataTableService需要的参数类型是TableInit
    //acrouter当前活跃路由
    //baseUrl请求的基本地址，用于调用接口的地址（如请求列表数据就会在该地址后加'/pageQuery'）
    //initSort初始化排序信息
    //tableFields列表的字段
    let initParams:QueryInit ={
      acrouter:this.acrouter,
      baseUrl:'/organization/employee',
      templetUrl:'/assets/excel/employee.xls',
      tableKeyCode:'empNo',
      initSort:[
        {name:'empNo',value:this.dataTableService.commonEnum.sortEnum.ASCEND.label}
      ],
      tableFields:[
        {header:"职员编号",field:"empNo",sortable:true},
        {header:"部门名称",field:"empDepartment",sortable:true,style:{'max-width':'140px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header:"姓名",field:"empName",sortable:true,style:{'max-width':'140px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header:"证件号码",field:"empIdcardno",sortable:true},
        {header:"职员卡号",field:"empCardid",sortable:true},
        {header:"职务名称",field:"empDuty",sortable:true,style:{'max-width':'140px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        {header:"员工类别",field:"empType",sortable:true,style:{'max-width':'140px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
        // {header:"岗位名称",field:"empPost",sortable:true,style:{'max-width':'140px','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden'}},
      ],
      operateDataCall:()=>{
        this.dataTableService.commonEnum.initEmployeeEnum();
      }
    }
    //初始化方法，始化查询参数、初始化排序然后调用restServcie.dataList向后台请求列表数据
    this.dataTableService.init(initParams);

    this.dataTableService.sharedServiceSubscription=this.dataTableService.sharedService.observable.subscribe(data=>{

    })
    this.dataTableService.commonEnum.departmentEnum.observable.subscribe(data=>{
      this.loadNodes(data);
    })
    this.loadNodes();
  }

  loadNodes(data?:any){
    this.nodes=ToTreeData.createTreeNode({source:data||this.dataTableService.commonEnum.departmentEnum.SOURCEDATA,idName:'dptName',pIdName:'dptSuperior',title:'dptName'});
    if(this.nodes&&this.nodes.length>0){
      this.dataTreeService.selectedKeysDefault.push(this.nodes[0].key)
    }
  }

  initPageQuery(){
    this.dataTableService.initPageQuery();
    this.currDept={};
  }

  //部门添加页面
  toAddPage(node) {
    node.visible = false;
    let data=node.origin.sourceData;
    this.dataTableService.router.navigate(["saveDep"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.dataTableService.sidebarOpen(true);
    this.dataTableService.sharedService.send({desc: this.dataTableService.commonEnum.descEnum.ADD.value, data: data});
  }

  //部门修改页面
  toEditPage(node) {
    node.visible = false;
    let data=node.origin.sourceData;
    this.dataTableService.router.navigate(["saveDep"], {relativeTo: this.acrouter, skipLocationChange: true});
    this.dataTableService.sidebarOpen(true);
    this.dataTableService.sharedService.send({desc: this.dataTableService.commonEnum.descEnum.UPDATE.value, data: data})
  }

  //部门删除页面
  deleteDept(node) {
    node.visible = false;
    if(node.children&&node.children.length>0){
      return;
      // this.dataTableService.messageService.info("该部门有子部门不能删除")

    }
    let data=node.origin.sourceData
    this.dataTableService.nzModalService.confirm({
      title: this.dataTableService.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.title,
      content: this.dataTableService.commonEnum.tipTemplateEnum.CONFIRMDELETEONE.content,
      onOk: () => {
        let valuesArr = [];
        let delValue = data['dptName'];
        valuesArr.push(delValue);
        this.dataTableService.restService.del(valuesArr,this.deptBaseUrl+'/delete').subscribe(result => {
          if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
            this.dataTableService.messageService.success("操作成功！");
            this.dataTableService.commonEnum.initDepartmentEnum();
          } else {
            this.dataTableService.messageService.error("操作失败！");
          }
        })
      },
      onCancel: () => {

      }
    });
  }

  treeSelect(node){
    let data=node;
    this.currDept=data.origin.sourceData;
    this.dataTableService.pageQuery.data.empDepartment=data.title;
    this.dataTableService.getDataList();
  }
  // 部门结构
  toShowpopover(node){
    node.visible = true;
    return false;

  }
  toHidepopover(node){
    node.visible = false;
    return false;
  }



  // 员工绑定卡片
  toBindPage(data){
    data.visible = false;
    this.employeeData = data;
    this.inputValue = this.employeeData.empCardid; //卡号回显

    this.isVisible = true;
    this.modalTitle.label = "您是否确认绑定该卡号？";
    this.modalTitle.value = true;
    this.isDisabled = false;
    this.urlValue = '/organization/employee/update';
  }

  // 员工取消绑定
  toUnbindPage(data){
    data.visible = false;    //气泡隐藏
    this.employeeData = data;
    this.inputValue = this.employeeData.empCardid; //卡号回显
    this.isVisible = true;   //弹出框显示
    this.isDisabled = true;  //不可修改
    this.modalTitle.label = "您是否确认取消绑定该卡片？";
    this.modalTitle.value = false;
    this.urlValue = '/organization/employee/update';
  }

  // checkValue(){
  //   if(this.inputValue.trim().length > 30){
  //     this.overnumber = true;
  //   } else {
  //     this.overnumber = false;
  //   }
  // }
  handleOk = (e) => {
    let employee=JSON.parse(JSON.stringify(this.employeeData));
    this.isVisible = false;
    if(this.modalTitle.value){
      this.employeeData.empCardid = this.inputValue.trim();
      //删除之前该卡号对应的人脸库
      this.faceService.deleteFace(employee)
      //重新创建人脸库
      employee.empCardid = this.inputValue.trim();
      let base64SplitReg = /^data:image\/(jpeg|png|gif);base64,/;
      let urlArr=this.dataTableService.commonEnum.fileServerInfo.DOWNLOADURL.value.split("/");
      let urlContent=urlArr[urlArr.length-2]
      this.fileService.convertImgToBase64(urlContent+"/"+this.employeeData.empPhoto,(data)=>{
        employee.empPhoto=data;
        employee.empPhoto=employee.empPhoto.replace(base64SplitReg,"");
        this.faceService.uploadFacePlus(employee)
      })
      this.dataTableService.restService.restRequest(this.employeeData||{},this.urlValue).subscribe(result=>{
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.dataTableService.lazyLoadDataList(null);
        }
      })
    } else {
      //删除该卡号对应的人脸库
      this.faceService.deleteFace(employee)
      this.employeeData.empCardid = '';
      this.dataTableService.restService.restRequest(this.employeeData||{},this.urlValue).subscribe(result=>{
        if (result.code == this.dataTableService.commonEnum.resultEnum.SUCCESS.value) {
          this.dataTableService.lazyLoadDataList(null);
        }
      })
    }
  };

  deleteOne(data){
    this.dataTableService.deleteOne(data,()=>{
      this.faceService.deleteFace(data);
    })
  }

  deleteMore(){
    this.dataTableService.deleteMore(()=>{
      this.dataTableService.selectedDataList.forEach(data => {
        this.faceService.deleteFace(data);
      })
    })
  }

  handleCancel = (e) => {
    this.isVisible = false;
  };

  ngOnDestroy() {
    if(this.dataTableService.sharedServiceSubscription){
      this.dataTableService.sharedServiceSubscription.unsubscribe();
    }
  }


}

