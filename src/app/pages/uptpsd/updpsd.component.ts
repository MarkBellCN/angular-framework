import {NgModule, Component, OnInit, Inject, OnDestroy, ElementRef, Renderer2, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Router, NavigationEnd} from '@angular/router';
import {HttpService, API_URL, NzMessageService, CustomDirectiveModule, SharedService} from "../../framework";
import {CommonEnum} from "../../common/entity/common.enum";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";

@Component({
  selector: 'app-reset',
  templateUrl: './updpsd.component.html',
  styleUrls: ['./updpsd.component.css']
})
export class UpdpsdComponent implements OnInit, OnDestroy {
  //sharedService的订阅对象，最后销毁需要取消订阅
  private sharedServiceSubscription;
  data: any = {};
  desc: string;
  title: string;
  uptpsdUrl: string;

  constructor(
    @Inject(API_URL) public readonly apiUrl: string,
    public readonly messageService: NzMessageService,
    public readonly sharedService: SharedService,
    public readonly httpService: HttpService,
    public readonly commonEnum: CommonEnum,
    public router: Router,
  ) {

  }

  secretError: boolean = false;
  passwordOld: FormControl = new FormControl("", Validators.compose([Validators.required]));
  passwordNew: FormControl = new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,18}$/)]));
  passwordConfirm: FormControl = new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,18}$/), this.passwordEqual.bind(this)]));

  ngOnInit() {
    this.passwordOld.valueChanges.distinctUntilChanged().subscribe((passwordOld) => {
      this.secretError = false;
    })
    this.passwordNew.valueChanges.distinctUntilChanged().subscribe((passwordNew) => {
      this.passwordConfirm.setValue("");
    })

    this.sharedServiceSubscription = this.sharedService.observable.subscribe(data => {
      if (data.desc == this.commonEnum.descEnum.UPTPSD.value) {
        this.data = data.data;
        this.desc = data.desc;
        this.title = "修改密码";
        this.uptpsdUrl = this.apiUrl + '/sys/sysUser' + '/updatePassword';
      } else if (data.desc == this.commonEnum.descEnum.RESETPSD.value) {
        this.data = data.data;
        this.desc = data.desc;
        this.title = "重置密码";
        this.uptpsdUrl = this.apiUrl + '/sys/sysUser' + '/resetPsd';
      }
    })
  }

  onSubmit() {
    //修改密码
    if (this.desc == this.commonEnum.descEnum.UPTPSD.value) {
      let params = {
        "password": this.passwordOld.value,
        "newPassword": this.passwordNew.value
      };
      this.httpService.request('post', this.uptpsdUrl, params).subscribe(res => {
        let result = res.body;
        if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
          this.router.navigate([{outlets: {reset: null}}]);
          this.messageService.success('密码修改成功,请重新登录');
          setTimeout(() => {
            this.router.navigateByUrl('auth/logout');
          }, 100)
        } else {
          if (result.msg == "旧密码错误") {
            this.secretError = true;
          } else {
            this.secretError = false;
            this.messageService.success(result.msg);
          }
        }
      })
    }
    //重置密码
    if (this.desc == this.commonEnum.descEnum.RESETPSD.value) {
      this.data.password = this.passwordNew.value;
      this.httpService.request('post', this.uptpsdUrl, this.data).subscribe(res => {
        let result = res.body;
        if (result.code == this.commonEnum.resultEnum.SUCCESS.value) {
          this.messageService.success("密码重置成功！");
          this.router.navigate([{outlets: {reset: null}}]);
        }
      })
    }
  }

  onCancle() {
    this.router.navigate([{outlets: {reset: null}}]);
    return false;
  }

  passwordEqual(ctrl: AbstractControl) {
    if (this.passwordConfirm == null) {
      return {passwordEqual: true}
    }
    if (this.passwordNew.value != this.passwordConfirm.value) {
      return {passwordEqual: true}
    } else {
      return null
    }
  }

  ngOnDestroy() {
    if (this.sharedServiceSubscription) {
      this.sharedServiceSubscription.unsubscribe();
    }
  }


}

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CustomDirectiveModule],
  declarations: [UpdpsdComponent],
  exports: [UpdpsdComponent],
})
export class UpdPsdModule {

}

