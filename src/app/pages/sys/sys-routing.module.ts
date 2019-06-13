import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';
import {SysResourceComponent} from './sys-resource/sys-resource.component';
import {SysResourceSaveComponent} from './sys-resource/sys-resource-save/sys-resource-save.component';
import {SysRoleComponent} from './sys-role/sys-role.component';
import {SysRoleSaveComponent} from './sys-role/sys-role-save/sys-role-save.component';
import {SysUserComponent} from './sys-user/sys-user.component';
import {SysUserSaveComponent} from './sys-user/sys-user-save/sys-user-save.component';
import {SysParamComponent} from './sys-param/sys-param.component';
import {SysParamSaveComponent} from './sys-param/sys-param-save/sys-param-save.component';
import {SysLogComponent} from './sys-log/sys-log.component';
import {SysLogSaveComponent} from './sys-log/sys-log-save/sys-log-save.component';
import {ClassifyInfoComponent} from './classify-info/classify-info.component';
import {ClassifyInfoSaveComponent} from'./classify-info/classify-info-save/classify-info-save.component'


const routes: Routes = [
  {
    path: 'sysResource', component: SysResourceComponent,
    children: [
      {path: 'save', component: SysResourceSaveComponent}
    ],
  },
  { path: 'sysRole', component: SysRoleComponent,
    children: [
      {path: 'save',component: SysRoleSaveComponent}
    ],
  },
  { path: 'sysUser', component: SysUserComponent,
    children: [
      {path: 'save',component: SysUserSaveComponent}
    ],
  },
  { path: 'sysParam', component: SysParamComponent,
    children: [
      {path: 'save',component: SysParamSaveComponent}
    ],
  },
  { path: 'sysLog', component: SysLogComponent,
    children: [
      {path: 'save',component: SysLogSaveComponent}
    ],
  },
  { path: 'classifyInfo', component: ClassifyInfoComponent,
    children: [
      {path: 'save',component: ClassifyInfoSaveComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class SysRoutingModule {

}
