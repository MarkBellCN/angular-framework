/**
 * @Author: MarkBell
 * @Description:
 * @Date 2018/4/27
 */
import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
];
