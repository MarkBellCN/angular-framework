/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {Inject, Injectable} from '@angular/core';
import {API_URL, HttpService, ResultEnum, SysResTypeEnum} from "../../framework";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UploadFileItem} from "./upload.file.item";
import {DepartmentComponent} from "../../pages/organization/department/department.component";
import {SendData} from "../../framework/common/shared.service";
import {D} from "@angular/core/src/render3";

export class WsServerInfo{
  public static WEBSCOKETSERVERURL={label:"webScoket地址",value:null};
}

export class VncServerInfo{
  public static VNCCLIENTPORT={label:"VNC端口",value:null};
}

export class FileServerInfo {
  public static DOWNLOADURL = {label: "文件下载地址", value: null};
  public static FILESERVICEURL = {label: "文件服务地址", value: null};
  public static UPLOADDEFAULT = {label: "上传文件默认参数", value: new UploadFileItem("jpg", "sims/management")};
  public static UPLOADIDCARD = {label: "上传证件照片参数", value: new UploadFileItem("jpg", "idcard")};
}

export class TipTemplateEnum {
  public static CONFIRMSAVE = {title: "您是否确认要保存内容？", content: '<i class="icon icon-save"></i><p>该操作会保存您录入的信息</p>'};
  public static CONFIRMDELETEONE = {
    title: "您是否确认删除内容？",
    content: '<i class="icon icon-multi-delete"></i><p>该操作会删除您录入的信息</p>'
  };
  public static CONFIRMQUERY = {
    title: "选择时间范围较长，是否继续查询？",
    content: '<i class="icon icon-multi-delete"></i><p>该操作需要等待较长时间</p>'
  };
  public static CONFIRMDELETEMORE = {
    title: "您是否确认删除选择的内容？",
    content: '<i class="icon icon-single-delete"></i><p>该操作会删除选择的信息</p>'
  };
  public static CONFIRMCANCELSUSPECT = {
    title: "您是否确认对选项进行撤控？",
    content: '<i class="icon icon-single-delete"></i><p>该操作会对选择的项目进行撤控操作</p>'
  };
  public static CONFIRMAGINSUSPECT = {
    title: "您是否确认对选项进行布控？",
    content: '<i class="icon icon-single-delete"></i><p>该操作会对选择的项目进行布控操作</p>'
  };
  public static CONFIRMDISPOSERESULT = {
    title: "您是否确认对选项进行该处理？",
    content: '<i class="icon icon-single-delete"></i><p>该操作会对选择的项目进行该处理</p>'
  };
}

export class PageSizeSelectorValues {
  public static readonly DEFAULT = 100;
  public static DATA = [20,50,100,200];
}

export class SortEnum {
  public static readonly ASCEND = {label: "ascend", value: 'asc'};
  public static readonly DESCEND = {label: "descend", value: 'desc'};
  public static DATAS = [
    SortEnum.ASCEND,
    SortEnum.DESCEND,
  ]
}


export class MessageSendTypeEnum {
  public static readonly SEND = {label: "已发送", value: true};
  public static readonly RECEIVE = {label: "接收的", value: false};
  public static DATAS = [
    MessageSendTypeEnum.SEND,
    MessageSendTypeEnum.RECEIVE,
  ]
}

// 旅客信息查询-行李开包
export class UnpackTypeEnum {
  public static readonly  REG = {label: "交运行李开包", value: true};
  public static readonly HAND = {label: "随身行李开包", value: false};
  public static DATAS = [
    UnpackTypeEnum.REG,
    UnpackTypeEnum.HAND,
  ]
}
// 旅客信息查询-旅客信息
export class PassengerTypeEnum {
  public static readonly  OWN = {label: "旅客本人", value: true};
  public static readonly GROUP = {label: "同行旅客", value: false};
  public static DATAS = [
    PassengerTypeEnum.OWN,
    PassengerTypeEnum.GROUP,
  ]
}

export class StatRangeEnum {
  public static readonly START = {label: "",icon:'fa fa-arrow-left', value: {start:0,end:33.3}};
  public static readonly MIDDLE = {label: "",icon:'fa fa-circle-o', value: {start:33.3,end:66.6}};
  public static readonly END = {label: "",icon:'fa fa-arrow-right', value: {start:66.6,end:100}};
  public static DATAS = [
    StatRangeEnum.START,
    StatRangeEnum.MIDDLE,
    StatRangeEnum.END,
  ]
}

export class FlightDateEnum {
  public static YESTERDAY={label:"昨天航班",value:-1,icon:'tabs-yesterday'};
  public static TODAY={label:"今天航班",value:0,icon:'tabs-today'};
  public static TOMORROW={label:"明天航班",value:1,icon:'tabs-tomorrow'};
  public static DATAS=[
    FlightDateEnum.YESTERDAY,
    FlightDateEnum.TODAY,
    FlightDateEnum.TOMORROW,
  ];
}


export class RefreshTimeEnum{
  public static THIRTYSEC={label:"30秒",value:1000*60*0.5};
  public static ONEMIN={label:"1分钟",value:1000*60*1};
  public static TWOMIN={label:"2分钟",value:1000*60*2};
  public static FIVEMIN={label:"5分钟",value:1000*60*5};
  public static DEFAULT=RefreshTimeEnum.THIRTYSEC;
  public static DATAS=[
    RefreshTimeEnum.THIRTYSEC,
    RefreshTimeEnum.ONEMIN,
    RefreshTimeEnum.TWOMIN,
    RefreshTimeEnum.FIVEMIN,
  ];
}

export class AirportAttrEnum {
  public static readonly classify = '属性';
  public static readonly ALL = {label: "全部", value: null};
  public static readonly HOME = {label: "国内", value: "D"};
  public static readonly INTL = {label: "国际", value: "I"};
  public static readonly REGION = {label: "地区", value: "R"};
  public static DATAS = [
    AirportAttrEnum.ALL,
    AirportAttrEnum.HOME,
    AirportAttrEnum.INTL,
    AirportAttrEnum.REGION,
  ];
  public static INPUTDATAS = [
    AirportAttrEnum.HOME,
    AirportAttrEnum.INTL,
    AirportAttrEnum.REGION,
  ];
}

// 统计界面地区属性
export class StatisticsAttrEnum {
  public static readonly classify = '属性';
  public static readonly ALL = {label: "全部", value: null};
  public static readonly HOME = {label: "国内", value: "D"};
  public static readonly INTL = {label: "国际", value: "I"};
  public static DATAS = [
    StatisticsAttrEnum.ALL,
    StatisticsAttrEnum.HOME,
    StatisticsAttrEnum.INTL,
  ];
  public static INPUTDATAS = [
    StatisticsAttrEnum.HOME,
    StatisticsAttrEnum.INTL,
  ];
}


//暂存物品管理的记录类型
export class AiRecordTypeEnum {
  public static readonly classify = '记录类型';
  public static readonly STORAGE = {label: "暂存", value: "暂存"};
  public static readonly TRANSFER = {label: "移交", value: "移交"};
  public static readonly LOSE = {label: "遗失", value: "遗失"};
  public static DATAS = [
    AiRecordTypeEnum.STORAGE,
    AiRecordTypeEnum.TRANSFER,
    AiRecordTypeEnum.LOSE,
  ];
  public static INPUTDATAS = [
    AiRecordTypeEnum.STORAGE,
    AiRecordTypeEnum.TRANSFER,
    AiRecordTypeEnum.LOSE,
  ];
}

//暂存物品管理的处理结果
export class AiDisposeResultEnum {
  public static readonly classify = '处理结果';
  public static readonly COLLECT = {label: "领取", value: "领取"};
  public static readonly TRANSFER = {label: "移交", value: "移交"};
  public static readonly OVERDUE = {label: "过期", value: "过期"};
  public static DATAS = [
    AiDisposeResultEnum.COLLECT,
    AiDisposeResultEnum.TRANSFER,
    AiDisposeResultEnum.OVERDUE,
  ];
  public static INPUTDATAS = [
    AiDisposeResultEnum.COLLECT,
    AiDisposeResultEnum.TRANSFER,
    AiDisposeResultEnum.OVERDUE,
  ];
}

// 安检通道类型的通道状态
export class SwitchChannelEnum {
  public static readonly classify = '通道状态';
  public static readonly OPEN = {label: "开", value: "open"};
  public static readonly CLOSE = {label: "关", value: "close"};
  public static DATAS = [
    SwitchChannelEnum.OPEN,
    SwitchChannelEnum.CLOSE,
  ];
  public static INPUTDATAS = [
    SwitchChannelEnum.OPEN,
    SwitchChannelEnum.CLOSE,
  ];
}

// 安检通道类型的通道类型
export class ChanneTypelEnum {
  public static readonly classify = '通道类型';
  public static readonly LUGCHN = {label: "行李安检", value: "行李安检"};
  public static readonly PASCHN = {label: "旅客安检", value: "旅客安检"};
  public static DATAS = [
    ChanneTypelEnum.LUGCHN,
    ChanneTypelEnum.PASCHN,
  ];
  public static INPUTDATAS = [
    ChanneTypelEnum.LUGCHN,
    ChanneTypelEnum.PASCHN,
  ];
}

export class DescEnum {
  public static MENUCOLLAPSED = {label: "菜单折叠变换", value: "menuCollapsed"};
  public static NOTICECOMPONENT = {label: "通知其他组件", value: "noticeComponent"};
  public static UPTPSD = {label: "修改密码", value: "uptpsd"};
  public static RESETPSD = {label: "重置密码", value: "resetpsd"};
  public static BATCHADD = {label: "修改", value: "batchadd"};
  public static BATCHUPDATE = {label: "修改", value: "batchupdate"};
  public static UPDATE = {label: "修改", value: "update"};
  public static ADD = {label: "新增", value: "add"};
  public static DETAIL = {label: "详情", value: "detail"};
  public static REFRESH = {label: "刷新", value: "refresh"};
  public static DATAS = [
    DescEnum.NOTICECOMPONENT,
    DescEnum.UPTPSD,
    DescEnum.RESETPSD,
    DescEnum.BATCHADD,
    DescEnum.BATCHUPDATE,
    DescEnum.UPDATE,
    DescEnum.ADD,
    DescEnum.DETAIL,
    DescEnum.REFRESH,
  ]
}

export class YesOrNoEnum {
  public static ALL = {label: "全部", value: null};
  public static Yes = {label: "是", value: "Y"};
  public static NO = {label: "否", value: "N"};
  public static DATAS = [
    YesOrNoEnum.ALL,
    YesOrNoEnum.Yes,
    YesOrNoEnum.NO,
  ];
  public static INPUTDATAS = [
    YesOrNoEnum.Yes,
    YesOrNoEnum.NO,
  ]
}


export class SexEnum {
  public static ALL = {label: "全部", value: null};
  public static MALE = {label: "男", value: "1"};
  public static FEMALE = {label: "女", value: "0"};
  public static DATAS = [
    SexEnum.ALL,
    SexEnum.MALE,
    SexEnum.FEMALE,
  ];
  public static INPUTDATAS = [
    SexEnum.MALE,
    SexEnum.FEMALE,
  ]
}

export class MessageEnum {
  public static ALL={value:null,label:'全部'};
  public static MANAGER={value:'ADMIN',label:'后台管理',nameClass:'msg-type yz'};
  public static YZ={value:'AJYZ',label:'验证',nameClass:'msg-type yz'};
  public static STKB={value:'XLKB_ST',label:'手提开包',nameClass:'msg-type stkb'};
  public static TYKB={value:'XLKB_TY',label:'托运开包',nameClass:'msg-type tykb'};
  public static ZJ={value:'AJYZ_ZJ',label:'闸机',nameClass:'msg-type qt'};
  public static DATAS=[
    MessageEnum.ALL,
    MessageEnum.YZ,
    MessageEnum.STKB,
    MessageEnum.TYKB,
    MessageEnum.ZJ,
  ]
  public static INPUTDATAS=[
    MessageEnum.YZ,
    MessageEnum.STKB,
    MessageEnum.TYKB,
    MessageEnum.ZJ,
  ]

}
export class WorkSpaceTypeEnum {
  public static YZ={value:'AJYZ',label:'验证'};
  public static STKB={value:'XLKB_ST',label:'手提开包'};
  public static TYKB={value:'XLKB_TY',label:'托运开包'};
  public static DATAS=[
    WorkSpaceTypeEnum.YZ,
    WorkSpaceTypeEnum.STKB,
    WorkSpaceTypeEnum.TYKB,
  ]

}


export class GenderEnum {
  public static ALL = {label: "全部", value: null};
  public static MALE = {label: "男", value: "M"};
  public static FEMALE = {label: "女", value: "F"};
  public static UNKNOWN = {label: '未知', value: 'U'};
  public static DATAS = [
    GenderEnum.ALL,
    GenderEnum.MALE,
    GenderEnum.FEMALE,
    GenderEnum.UNKNOWN,
  ];
  public static INPUTDATAS = [
    GenderEnum.MALE,
    GenderEnum.FEMALE,
    GenderEnum.UNKNOWN,
  ]
}

export class StatusEnum {
  public static ALL = {label: "全部", value: null};
  public static ENABLE = {label: "启用", value: 0};
  public static DISABLE = {label: "禁用", value: 1};
  public static DATAS = [
    StatusEnum.ALL,
    StatusEnum.ENABLE,
    StatusEnum.DISABLE,
  ];
  public static INPUTDATAS = [
    StatusEnum.ENABLE,
    StatusEnum.DISABLE,
  ]
}

export class FlightTypeEnum {
  public static readonly classify = '进出标识';
  public static ALL = {label: "全部", value: null};
  public static TYPEA = {label: "进港航班", value: 'A'};
  public static TYPED = {label: "出港航班", value: 'D'};
  public static TYPET = {label: "一进一出", value: 'T'};
  public static TYPEAT = {label: "进港", value: 'A'};
  public static TYPEDT = {label: "出港", value: 'D'};
  public static DATAS = [
    FlightTypeEnum.TYPEA,
    FlightTypeEnum.TYPED,
  ];
  public static STATDATAS = [
    FlightTypeEnum.ALL,
    FlightTypeEnum.TYPEAT,
    FlightTypeEnum.TYPEDT,
  ];
  public static INPUTDATAS = [
    FlightTypeEnum.TYPEAT,
    FlightTypeEnum.TYPEDT,
  ];

}

// 舱门复检记录的通道状态
export class PassStatusEnum {
  public static ALLOW = {label: "是", value: 'Y'};
  public static REFUSE = {label: "否", value: 'N'};
  public static DATAS = [
    PassStatusEnum.ALLOW,
    PassStatusEnum.REFUSE,
  ];

}

export class PermissionType {
  public static ADD = {label: "添加", value: 'add'};
  public static UPDATE = {label: "编辑", value: 'update'};
  public static DELETE = {label: "删除", value: 'delete'};
  public static RESETPWD = {label: "重置密码", value: 'resetPsd'};
  public static DATAS = [
    PermissionType.ADD,
    PermissionType.UPDATE,
    PermissionType.DELETE,
    PermissionType.RESETPWD,
  ]
}



//所有的机场列表信息
export class AirportListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return AirportListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    AirportListEnum.subject.next(data);
  }
  public static DATAS = []
}
//所有的登机口列表信息
export class GateListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return GateListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    GateListEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有的登机设备类型信息
export class GateDevicetypeEnum {
  public static ALL = {label: "全部", value: null};
  public static AGTE = {label: "登机口终端", value: "gate"};
  public static MACHINE = {label: "登机口闸机", value: "machine"};
  public static CENTER = {label: "控制中心", value: "center"};
  public static DATAS = [
    GateDevicetypeEnum.ALL,
    GateDevicetypeEnum.AGTE,
    GateDevicetypeEnum.MACHINE,
    GateDevicetypeEnum.CENTER,
  ];
  public static INPUTDATAS = [
    GateDevicetypeEnum.AGTE,
    GateDevicetypeEnum.MACHINE,
    GateDevicetypeEnum.CENTER,
  ]
}
//所有的航站楼列表信息
export class TerminalListEnum {
  public static LOCALSTORAGEKEY='sims/terminal';
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return TerminalListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    TerminalListEnum.subject.next(data);
  }
  //获取默认航站楼
  public static get DEFAULT(){
    return localStorage.getItem(TerminalListEnum.LOCALSTORAGEKEY);
  }

  public static DATAS = []
}
//所有的班组列表信息
export class TeamListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return TeamListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    TeamListEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有的岗位列表信息
export class PostListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return PostListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    PostListEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有候机区名称信息列表
export class RegionListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return RegionListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    RegionListEnum.subject.next(data);
  }
  public static DATAS = []
}

//违禁品的所有的处置方式列表
export class CdDisposalEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return CdDisposalEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    CdDisposalEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有航司IATA码列表信息
export class TermReservedEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return TermReservedEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    TermReservedEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有的通道列表信息
export class ChannelListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return ChannelListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    ChannelListEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有的通道列表信息
export class DeviceInfoListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return DeviceInfoListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    DeviceInfoListEnum.subject.next(data);
  }
  public static DATAS = []
}

//违禁品分类列表
export class Ctclassify {
  public static readonly classify = 'contrabandClassify';
  public static DATAS = [
  ];
}

//重要事件录入的事件类型列表
export class EventTypeEnum {
  public static readonly classify = '事件类型';
  public static ALL = {label: "全部", value: null};
  public static GOOD = {label: "好人好事", value: '好人好事'};
  public static FLAG = {label: "锦旗", value: '锦旗'};
  public static PRAISE = {label: "表扬信", value: '表扬信'};
  public static COMPLAIN = {label: "投诉", value: '投诉'};
  public static ERROR = {label: "服务差错", value: '服务差错'};
  public static PROMISE = {label: "服务承诺", value: '服务承诺'};
  public static DATAS = [
    EventTypeEnum.ALL,
    EventTypeEnum.GOOD,
    EventTypeEnum.FLAG,
    EventTypeEnum.PRAISE,
    EventTypeEnum.COMPLAIN,
    EventTypeEnum.ERROR,
    EventTypeEnum.PROMISE,
  ];
  public static INPUTDATAS = [
    EventTypeEnum.GOOD,
    EventTypeEnum.FLAG,
    EventTypeEnum.PRAISE,
    EventTypeEnum.COMPLAIN,
    EventTypeEnum.ERROR,
    EventTypeEnum.PROMISE,
  ];
}

//人员布控管理的证件类型
export class IdcardTypeEnum {
  public static readonly classify = '证件类型';
  public static ALL = {label: "全部", value: null};
  public static IDCARD = {label: "身份证", value: '身份证'};
  public static PASSPORT = {label: "护照", value: '护照'};
  public static OTHERS = {label: "其他", value: '其他'};
  public static DATAS = [
    IdcardTypeEnum.ALL,
    IdcardTypeEnum.IDCARD,
    IdcardTypeEnum.PASSPORT,
    IdcardTypeEnum.OTHERS,

  ];
  public static INPUTDATAS = [
    IdcardTypeEnum.IDCARD,
    IdcardTypeEnum.PASSPORT,
    IdcardTypeEnum.OTHERS,

  ];
}

export class VrModeEnum {
  public static readonly classify = '证件类型';
  public static ALL = {label: "全部", value: null};
  public static ONECARD = {label: "一证模式", value: '2'};
  public static TWOCARD = {label: "双证模式", value: '1'};
  public static OTHERCARD = {label: "其它模式", value: '3'};
  public static DATAS = [
    VrModeEnum.ALL,
    VrModeEnum.ONECARD,
    VrModeEnum.TWOCARD,
    VrModeEnum.OTHERCARD,
  ];
  public static INPUTDATAS = [
    VrModeEnum.ONECARD,
    VrModeEnum.TWOCARD,
    VrModeEnum.OTHERCARD,
  ];
}

export class VrTypeEnum {
  public static readonly classify = '验证类型';
  public static ALL = {label: "全部", value: null};
  public static OUT = {label: "离开", value: '离开'};
  public static IN = {label: "进入", value: '进入'};
  public static DATAS = [
    VrTypeEnum.ALL,
    VrTypeEnum.OUT,
    VrTypeEnum.IN,
  ];
  public static INPUTDATAS = [
    VrModeEnum.ONECARD,
    VrTypeEnum.OUT,
    VrTypeEnum.IN,
  ];
}


//黑名单人员等级
export class BlackLevelEnum {
  public static readonly classify = '等级';
  public static ALL = {label: "全部", value: null};
  public static BADLY = {label: "极差", value: 1};
  public static BAD = {label: "差", value: 2};
  public static GENEL = {label: "一般", value: 3};
  public static DATAS = [
    BlackLevelEnum.ALL,
    BlackLevelEnum.BADLY,
    BlackLevelEnum.BAD,
    BlackLevelEnum.GENEL,

  ];
  public static INPUTDATAS = [
    BlackLevelEnum.BADLY,
    BlackLevelEnum.BAD,
    BlackLevelEnum.GENEL,

  ];
}

//行李类型
export class ArtTypeEnum {
  public static readonly classify = '行李类型';
  public static ALL = {label: "全部", value: null};
  public static HAND = {label: "随身行李", value: '随身行李'};
  public static UNHAND = {label: "交运行李", value: '交运行李'};

  public static DATAS = [
    ArtTypeEnum.ALL,
    ArtTypeEnum.HAND,
    ArtTypeEnum.UNHAND,
  ];
  public static INPUTDATAS = [
    ArtTypeEnum.HAND,
    ArtTypeEnum.UNHAND,
  ];
}

//黑名单人员审核标志
export class BlackApprovedFlagEnum {
  public static readonly classify = '审核标志';
  public static ALL = {label: "全部", value: null};
  public static NONE = {label: "未审核", value: '0'};
  public static PASS = {label: "审核通过", value: '1'};
  public static FAIL = {label: "审核不通过", value: '2'};
  public static DATAS = [
    BlackApprovedFlagEnum.ALL,
    BlackApprovedFlagEnum.NONE,
    BlackApprovedFlagEnum.PASS,
    BlackApprovedFlagEnum.FAIL,

  ];
  public static INPUTDATAS = [
    BlackApprovedFlagEnum.NONE,
    BlackApprovedFlagEnum.PASS,
    BlackApprovedFlagEnum.FAIL,
  ];
}

//系统信息分类类别数据
export class CtclassifyEnum {
  public static readonly classify = '系统分类类别';
  public static ALL = {label: "全部", value: null};
  public static UNIT = {label: "单位类型", value: 'articleUnit'};
  public static BAND = {label: "违禁品分类", value: 'contrabandClassify'};

  public static DATAS = [
    CtclassifyEnum.ALL,
    CtclassifyEnum.UNIT,
    CtclassifyEnum.BAND,
  ];
  public static INPUTDATAS = [
    CtclassifyEnum.UNIT,
    CtclassifyEnum.BAND,
  ];
}

//进港航班共享类型数据
export class AfSharetypeEnum {
  public static readonly classify = '共享类型';
  public static MAIN = {label: "主航班", value: 'M'};
  public static PLAIN = {label: "附属航班", value: 'P'};
  public static NON = {label: "非共享航班", value: 'A'};

  public static DATAS = [
    AfSharetypeEnum.MAIN,
    AfSharetypeEnum.PLAIN,
    AfSharetypeEnum.NON,
  ];
  public static INPUTDATAS = [
    AfSharetypeEnum.MAIN,
    AfSharetypeEnum.PLAIN,
    AfSharetypeEnum.NON,
  ];
}


//白名单人员类型
export class WlTypeEnum {
  public static readonly classify = '类型';
  public static ALL = {label:'全部', value: 'null'};
  public static POLITY = {label: "政客", value: 1};
  public static LEADER = {label: "集团领导", value: 2};
  public static DATAS = [
    WlTypeEnum.ALL,
    WlTypeEnum.POLITY,
    WlTypeEnum.LEADER,
  ];
  public static INPUTDATAS = [
    WlTypeEnum.POLITY,
    WlTypeEnum.LEADER,
  ];
}

//白名单人员关注等级
export class WlLelveEnum {
  public static readonly classify = '关注等级';
  public static ALL = {label:'全部', value: 'null'};
  public static NORMAL = {label: "一般关注", value: 1};
  public static FOCUS = {label: "重点关注", value: 2};
  public static DATAS = [
    WlLelveEnum.ALL,
    WlLelveEnum.NORMAL,
    WlLelveEnum.FOCUS,
  ];
  public static INPUTDATAS = [
    WlLelveEnum.NORMAL,
    WlLelveEnum.FOCUS,
  ];
}

//所有班组类型
export class TeamTypeListEnum {
  public static DATAS = []
}

//所有员工数据列表
export class EmployeeEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return EmployeeEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    EmployeeEnum.subject.next(data);
  }
  public static DATAS = []
}

//所有SysParam数据
export class SysParamListEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return SysParamListEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    SysParamListEnum.subject.next(data);
  }

  public static AIRORTNAMECH = {label: '', value: 'airportFullName'};
  public static FACESERVERURL = {label: '', value: 'faceServerUrl'};
  public static DATAS = []
}

//所有部门数据列表
export class DepartmentEnum {
  private static subject = new BehaviorSubject<any>(1);

  public static get observable(){
    return DepartmentEnum.subject.asObservable();
  }
  //发送数据
  public static send(data:any){
    DepartmentEnum.subject.next(data);
  }
  public static DATAS = [];

  public static SOURCEDATA = [];
}





/**
 * 预安检闸机
 */
//闸机状态
export class StatusDevEnum {
  public static readonly classify = '状态';
  public static readonly ALL = {label: "全部", value: null};
  public static readonly ENABLE = {label: "启用", value: "Y"};
  public static readonly DISABLE = {label: "停用", value: "N"};
  public static DATAS = [
    StatusDevEnum.ALL,
    StatusDevEnum.ENABLE,
    StatusDevEnum.DISABLE,
  ];
  public static INPUTDATAS = [
    StatusDevEnum.ENABLE,
    StatusDevEnum.DISABLE,
  ];
  public static REVERSEDATAS = [
    {label: "停用", value: "Y"},
    {label: "启用", value: "N"},
  ];
}

//闸机类型
export class GateTypeEnum {
  public static readonly classify = '类型';
  public static readonly ALL = {label: "全部", value: null};
  public static readonly SIMPLE = {label: "单门", value: "simple"};
  public static readonly MULTI = {label: "双门", value: "multi"};
  public static DATAS = [
    GateTypeEnum.ALL,
    GateTypeEnum.SIMPLE,
    GateTypeEnum.MULTI,
  ];
  public static INPUTDATAS = [
    GateTypeEnum.SIMPLE,
    GateTypeEnum.MULTI,
  ];
}

//闸机用途
export class GateUseEnum {
  public static readonly classify = '用途';
  public static readonly ALL = {label: "全部", value: null};
  public static readonly PSIMS = {label: "预安检", value: "psims"};
  public static readonly PBCS = {label: "自助安检", value: "pbcs"};
  public static readonly SHSIS = {label: "自助登机", value: "shsis"};
  public static DATAS = [
    GateUseEnum.ALL,
    GateUseEnum.PSIMS,
    GateUseEnum.PBCS,
    GateUseEnum.SHSIS,
  ];
  public static INPUTDATAS = [
    GateUseEnum.PSIMS,
    GateUseEnum.PBCS,
    GateUseEnum.SHSIS,
  ];
}




@Injectable()
export class CommonEnum {
  public CLASSIFY_INFO_DATA: Array<any> = [];
  public airportAttrEnum = AirportAttrEnum;
  public statisticsAttrEnum = StatisticsAttrEnum;   //统计界面属性选择
  public switchChannelEnum = SwitchChannelEnum;   //通道状态 开 关
  public channeTypelEnum = ChanneTypelEnum;  // 安检通道类型的通道类型
  public descEnum = DescEnum;
  public resultEnum = ResultEnum;
  public fileServerInfo = FileServerInfo;
  public wsServerInfo = WsServerInfo;
  public vncServerInfo = VncServerInfo;
  public yesOrNoEnum = YesOrNoEnum;
  public sexEnum = SexEnum;
  public genderEnum = GenderEnum;
  public statusEnum = StatusEnum;
  public sysResTypeEnum = SysResTypeEnum;
  public flightTypeEnum = FlightTypeEnum;
  public workSpaceTypeEnum = WorkSpaceTypeEnum;
  public permissionType = PermissionType;
  public pageSizeSelectorValues = PageSizeSelectorValues;
  public sortEnum = SortEnum;
  public tipTemplateEnum = TipTemplateEnum;
  public terminalListEnum = TerminalListEnum;    //所有航站楼信息列表
  public gateListEnum = GateListEnum;    //所有登机口列表
  public gateDevicetypeEnum = GateDevicetypeEnum;
  public regionListEnum = RegionListEnum;        //所有候机区名称信息列表
  public aiRecordTypeEnum = AiRecordTypeEnum;    //暂存物品记录类型
  public aiDisposeResultEnum = AiDisposeResultEnum;  //暂存物品处理结果
  public cdDisposalEnum = CdDisposalEnum;  //违禁品的所有的处置方式列表
  public ctclassify = Ctclassify;    //违禁品分类列表
  public eventTypeEnum = EventTypeEnum;   //重要事件录入的事件类型列表
  public termReservedEnum = TermReservedEnum;  //所有航司IATA码列表信息
  public airportListEnum = AirportListEnum;  //所有机场列表信息
  public idcardTypeEnum = IdcardTypeEnum;    //人员布控管理的证件类型
  public blackLevelEnum = BlackLevelEnum;    //黑名单人员等级
  public artTypeEnum = ArtTypeEnum;    //黑名单人员等级
  public blackApprovedFlagEnum = BlackApprovedFlagEnum;   //黑名单人员审核标志
  public channelListEnum = ChannelListEnum;
  public deviceInfoListEnum = DeviceInfoListEnum;
  public vrModeEnum = VrModeEnum;
  public vrTypeEnum = VrTypeEnum;
  public teamTypeListEnum = TeamTypeListEnum;  //所有班组类型列表
  public teamListEnum = TeamListEnum;          ////初始化所有班组名称、班组编号数据
  public employeeEnum = EmployeeEnum;   //所有员工数据类表
  public ctclassifyEnum = CtclassifyEnum; //分类信息管理类别分类
  public AfSharetypeEnum = AfSharetypeEnum;   //进港航班共享类型数据
  public departmentEnum = DepartmentEnum;   //所有部门信息
  public sysParamListEnum = SysParamListEnum;   //所有系统参数信息
  public messageEnum = MessageEnum;   //消息类型
  public messageSendTypeEnum = MessageSendTypeEnum;   //消息发送类型
  public unpackTypeEnum = UnpackTypeEnum;   //旅客信息查询的行李开包类型
  public passengerTypeEnum = PassengerTypeEnum; //旅客信息查询的旅客信息类型
  public statRangeEnum = StatRangeEnum;   //统计图范围选择
  public flightDateEnum = FlightDateEnum;   //日期选择
  public refreshTimeEnum = RefreshTimeEnum;   //自动刷新时间
  public postListEnum = PostListEnum;   //岗位信息
  public wlTypeEnum = WlTypeEnum;   //白名单人员类型
  public wlLelveEnum = WlLelveEnum;  //白名单人员关注等级
  public passStatusEnum = PassStatusEnum; // 舱门复检记录的通道状态


  /**
   * 预安检闸机
   */
  public statusDevEnum = StatusDevEnum;     //闸机的状态
  public gateTypeEnum = GateTypeEnum;       //闸机类型 
  public gateUseEnum = GateUseEnum;         //闸机用途

  public commonEnum = [
    this.flightTypeEnum
  ];

  constructor(@Inject(API_URL) public readonly apiUrl: string,
              public readonly httpService: HttpService,) {
  }

  //获取默认日期
  getDefaultTimeRange(){
    let now = new Date();
    return [new Date(now.getTime()- 24 * 60 * 60 * 1000),now]
  }

  //获取默认确认查询提示范围最大值
  getDefaultMaxTimeConfirmTip(){
    return 7 * 24 * 60 * 60 * 1000;
  }

  getDefaultTime(){
    let now = new Date();
    return now;
  }
  //根据commonEnum初始化数据
  initData() {
    this.initProps();
    this.initAirportListEnum();
    this.initTerminalListEnum();
    this.initGateListEnum();
    this.initRegionListEnum();
    this.initCdDisposalEnum();
    this.initTermReservedEnum();
    this.initChannelListEnum();
    this.initDeviceInfoListEnum();
    this.initTeamTypeListEnum();
    this.initTeamListEnum();
    this.initEmployeeEnum();
    this.initDepartmentEnum();
    this.initSysParamListEnum();
    this.initPostlistenum();
    this.loadClassifyInfo();
  }

  initProps() {
    //加载初始化属性
    this.httpService.request("post", this.apiUrl + '/basicdata/init' + '/props', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.fileServerInfo.DOWNLOADURL.value = result.data.fileDownloadUrl
        this.fileServerInfo.FILESERVICEURL.value = result.data.fileServiceUrl
        this.wsServerInfo.WEBSCOKETSERVERURL.value=result.data.aispWsUrl
        this.vncServerInfo.VNCCLIENTPORT.value=result.data.vncClientPort
      }
    })
  }

  //初始化所有机场数据
  initAirportListEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/airport' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.airportListEnum.DATAS = [];
        result.data.forEach(item => {
          this.airportListEnum.DATAS.push({value: item.arptCode3, label: item.arptCode3 +'\n'+item.arptBriefCh});
        })
      }
      AirportListEnum.send(this.airportListEnum.DATAS);
    })
  }

  //初始化所有航站楼数据
  initTerminalListEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/terminal' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.terminalListEnum.DATAS = [];
        result.data.forEach(item => {
          this.terminalListEnum.DATAS.push({value: item.termNo, label: item.termNo});
        })
      }
      TerminalListEnum.send(this.terminalListEnum.DATAS);
    })
  }
  //初始化所有登机口数据
  initGateListEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/gate' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.gateListEnum.DATAS = [];
        result.data.forEach(item => {
          this.gateListEnum.DATAS.push({value: item.gateNo, label: item.gateNo});
        })
      }
      GateListEnum.send(this.gateListEnum.DATAS);
    })
  }

  //初始化所有班组名称、班组编号数据
  initTeamListEnum() {
    this.httpService.request("post", this.apiUrl + '/organization/team' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.teamListEnum.DATAS = [];
        result.data.forEach(item => {
          this.teamListEnum.DATAS.push({value: item.teamNo, label: item.teamNo});
        })
      }
      TeamListEnum.send(this.teamListEnum.DATAS);
    })
  }

  //初始化所有岗位信息
  initPostlistenum(){
    this.httpService.request("post", this.apiUrl + '/organization/post' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.postListEnum.DATAS = [];
        result.data.forEach(item => {
          this.postListEnum.DATAS.push({value: item.postName, label: item.postName});
        })
      }
      PostListEnum.send(this.postListEnum.DATAS);
    })
  }

  //初始化所有候机区名称信息列表
  initRegionListEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/region' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.regionListEnum.DATAS = [];
        result.data.forEach(item => {
          this.regionListEnum.DATAS.push({value: item.rgnName, label: item.rgnName});
        })
      }
      RegionListEnum.send(this.regionListEnum.DATAS);
    })
  }

  //初始化违禁品的所有的处置方式列表
  initCdDisposalEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/contrabandDisposition' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.cdDisposalEnum.DATAS = [];
        result.data.forEach(item => {
          this.cdDisposalEnum.DATAS.push({value: item.cdDisposition, label: item.cdDisposition});
        })
      }
      CdDisposalEnum.send(this.cdDisposalEnum.DATAS);
    })
  }

  //初始化所有航司IATA码列表信息
  initTermReservedEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/airline' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.termReservedEnum.DATAS = [];
        result.data.forEach(item => {
          this.termReservedEnum.DATAS.push({value: item.arlnIata, label: item.arlnIata + '\n' + item.arlnBrieC});
        })
      }
      TermReservedEnum.send(this.termReservedEnum.DATAS);
    })
  }

  //初始化所有安检通道数据
  initChannelListEnum() {
    this.httpService.request("post", this.apiUrl + '/basicdata/channel' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.channelListEnum.DATAS = [];
        result.data.forEach(item => {
          this.channelListEnum.DATAS.push({value: item.chnNo, label: item.chnNo});
        })
      }
      ChannelListEnum.send(this.channelListEnum.DATAS);
    })
  }

  //初始化预安检闸机设备
  initDeviceInfoListEnum(){
    this.httpService.request("post", this.apiUrl + '/basicdata/deviceInfoT' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.deviceInfoListEnum.DATAS = [];
        // debugger
        result.data.forEach(item => {
          this.deviceInfoListEnum.DATAS.push({value: item.deviceId, label: item.deviceName});
        })
      }
      DeviceInfoListEnum.send(this.deviceInfoListEnum.DATAS);
    })
  }

  //初始化所有班组类型列表数据
  initTeamTypeListEnum() {
    this.httpService.request("post", this.apiUrl + '/organization/team' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.teamTypeListEnum.DATAS = [];
        let teamtemporary = [];    //数组去重
        result.data.forEach(item => {
          if(teamtemporary.indexOf(item.teamType) == -1){
            teamtemporary.push(item.teamType);
          }
        })
        teamtemporary.forEach(item=>{
          this.teamTypeListEnum.DATAS.push({value: item, label: item})
        })
      }
    })
  }
  //初始化系统参数列表数据
  initSysParamListEnum(){
    this.httpService.request("post", this.apiUrl + '/sys/sysParam' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.sysParamListEnum.DATAS = [];
        result.data.forEach(item => {
          this.sysParamListEnum.DATAS.push({value: item.sysParamName, label: item.sysParamValue});
          if(this.sysParamListEnum.AIRORTNAMECH.value==item.sysParamName){
            this.sysParamListEnum.AIRORTNAMECH.label=item.sysParamValue;
          }
          if(this.sysParamListEnum.FACESERVERURL.value==item.sysParamName){
            this.sysParamListEnum.FACESERVERURL.label=item.sysParamValue;
          }
        })
      }
      SysParamListEnum.send(this.sysParamListEnum.DATAS);
    })
  }

  //初始化所有员工数据列表
  initEmployeeEnum() {
    this.httpService.request("post", this.apiUrl + '/organization/employee' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.employeeEnum.DATAS = [];
        result.data.forEach((item,index) => {
          this.employeeEnum.DATAS.push({key:index.toString(), title: item.empName,id: item.empNo,description:item.empName, direction: 'left', checked: false});
        })
      }
      EmployeeEnum.send(this.employeeEnum.DATAS);
    })
  }

  //初始化所有部门数据列表
  initDepartmentEnum() {
    this.httpService.request("post", this.apiUrl + '/organization/department' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        this.departmentEnum.DATAS = [];
        this.departmentEnum.SOURCEDATA=result.data;
        result.data.forEach((item,index) => {
          this.departmentEnum.DATAS.push({label: item.dptName,id: item.dptName,value:item.dptName});
        })
      }
      DepartmentEnum.send(this.departmentEnum.SOURCEDATA);
    })
  }



  //加载classlfyInfo数据
  public loadClassifyInfo(){
    this.httpService.request("post", this.apiUrl + '/sys/classifyInfo' + '/queryAll', {}).map((res: any) => {
      let result = res.body;
      return result;
    }).subscribe(result => {
      if (result.code == this.resultEnum.SUCCESS.value) {
        let ctclassifyData=[];
        result.data.forEach(item=>{
          if(item.ciClassify==this.ctclassify.classify){
            ctclassifyData.push({label: item.ciName,value:item.ciName})
          }
        })
        this.ctclassify.DATAS=ctclassifyData;
      }
    })
  }

}
