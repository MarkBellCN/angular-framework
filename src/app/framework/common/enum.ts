/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
export class ResultEnum {
  public static SUCCESS = {label: "成功", value: "0"};
  public static DATAS = [
    ResultEnum.SUCCESS,
  ]
}
export class SysResTypeEnum {
  public static ALL = {label: "全部", value: null};
  public static MENU = {label: "菜单", value: "0"};
  public static BUTTON = {label: "按钮", value: "1"};
  public static DATAS = [
    SysResTypeEnum.ALL,
    SysResTypeEnum.MENU,
    SysResTypeEnum.BUTTON,
  ];
  public static INPUTDATAS = [
    SysResTypeEnum.MENU,
    SysResTypeEnum.BUTTON,
  ]
}
