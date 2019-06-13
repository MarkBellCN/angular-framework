/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
declare const Buffer;
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AUTH_OPTIONS_TOKEN} from '../../../../framework/auth/auth.options';
import {getDeepFromObject} from '../../../../framework/helpers';
import {AuthResult, AuthService} from '../../../../framework/auth/service/auth.service';
import {TokenService} from '../../../../framework/auth/service/token.service';
import {SharedService} from "../../../../framework/common/shared.service";
import {API_URL, HttpService} from "../../../../framework/common/http.service";
import {NzMessageService} from '../../../../framework/ui-component';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {

  }
  //登录成功后延时跳转事件
  redirectDelay: number = 0;
  //用于验证的Service
  provider: string = '';
  errors: string[] = [];
  messages: string[] = [];
  //验证的用户信息
  user: any = {};
  //是否正在提交数据，成功后为false
  submitted: boolean = false;
  //用于标记密码是否可见
  isVisible: boolean = false;
  type: string = "password";
  constructor(protected service: AuthService,
              @Inject(AUTH_OPTIONS_TOKEN) public readonly config = {},
              public readonly httpService: HttpService,
              public readonly tokenServie: TokenService,
              public readonly sharedService: SharedService,
              public readonly nzMessageService: NzMessageService,
              @Inject(API_URL) public readonly apiUrl: string,
              public readonly router: Router) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  base64decoder(Context): any {
    let decoder: string = new Buffer(Context, 'base64').toString();
    return decoder;
  }

  login(): void {
    if(this.submitted){
      return;
    }
    this.nzMessageService.remove();
    this.errors = this.messages = [];
    if (!this.user.username || this.user.username.trim() == '') {
      this.nzMessageService.warning("用户名不能为空！")
      return;
    }
    if (!this.user.password || this.user.password.trim() == '') {
      this.nzMessageService.warning("密码不能为空！")
      return;
    }
    this.submitted = true;
    this.service.authenticate(this.provider, this.user).subscribe((result: AuthResult) => {
      this.messages=result.getMessages();
      if (result.isSuccess()) {
        let authSimpleToken=result.getTokenValue();
        let dataArray:string[]=authSimpleToken.token.split(".")
        let jsonStr:string=this.base64decoder(dataArray[1]);
        let jsonObj=JSON.parse(jsonStr);
        this.service.permissionService.clean();
        this.service.permissionService.queryResourceByUser(jsonObj.userId,()=>{
          if(this.service.permissionService.menuSourceDatas&&this.service.permissionService.menuSourceDatas.length>0){
            const redirect = result.getRedirect();
            if (redirect) {
              setTimeout(() => {
                return this.service.permissionService.loginRedirect();
              }, this.redirectDelay);
            }
          }else{
            this.nzMessageService.warning("该用户没有分配任何权限！")
            this.submitted=false;
          }
        });
      }else{
        this.loginErrorTip();
        return;
      }
    });

  }

  loginErrorTip(){
    this.submitted=false;
    this.messages.forEach(msg=>{
      this.nzMessageService.error(msg)
    })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

  visible(){
    if(!this.isVisible){
      this.type = "text";
    } else {
      this.type = "password";
    }
    this.isVisible = !this.isVisible;
  }


}
