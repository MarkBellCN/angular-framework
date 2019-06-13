/**
 * @Author: MarkBell
 * @Description:
 * @Date 2017/11/7
 */
import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SharedService} from "./framework";
import {CommonEnum, RouteInterceptService, WebSocketService} from "./common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private routeInterceptService: RouteInterceptService,
    private titleService: Title,
    @Inject('APP_VERSION') public readonly APP_VERSION: string,
    public commonEnum: CommonEnum,
    public webSocketService: WebSocketService,
    public sharedService: SharedService) {
  }

  ngOnInit(): void {
    console.log("欢迎使用安检系统，如有问题请联系维护人员，系统版本为："+this.APP_VERSION);
    this.routeInterceptService.trackPageViews();

    //检测webscoket连接情况
    setInterval(()=>{
      if(this.commonEnum.wsServerInfo.WEBSCOKETSERVERURL.value&&!this.webSocketService.ws){
        console.log("webScoket连接"+this.commonEnum.wsServerInfo.WEBSCOKETSERVERURL.value)
        this.webSocketService.connect(this.commonEnum.wsServerInfo.WEBSCOKETSERVERURL.value);
      }
    },1000)
  }
}
