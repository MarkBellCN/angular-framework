/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthResult, AuthService} from '../../../../framework/auth/service/auth.service';
@Component({
  selector: 'logout',
  template: `
    <div>正在退出...</div>
  `,
})
export class LogoutComponent implements OnInit {

  redirectDelay: number = 300;

  constructor(protected service: AuthService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.logout('username');
  }

  logout(provider: string): void {

    this.service.logout(provider).subscribe((result: AuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }
}
