/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'auth',
  styleUrls: ['./auth.component.css'],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AuthComponent implements OnDestroy {

  subscription: any;

  authenticated: boolean = false;

  token: string = '';

  constructor(protected auth: AuthService) {

    this.subscription = auth.onAuthenticationChange()
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
