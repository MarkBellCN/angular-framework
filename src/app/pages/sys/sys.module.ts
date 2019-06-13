import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SysRoutingModule} from './sys-routing.module';
import {
  NgZorroAntdModule,
  CustomDirectiveModule,
  UiSidebarModule,
  SelectButtonModule,
  NzTreeModule,
  UiOverlayPanelModule
} from "../../framework";
import {SysResourceComponent} from './sys-resource/sys-resource.component';
import {SysResourceSaveComponent} from './sys-resource/sys-resource-save/sys-resource-save.component';
import {SysRoleComponent} from './sys-role/sys-role.component';
import {SysRoleSaveComponent} from './sys-role/sys-role-save/sys-role-save.component';
import {SysUserComponent} from './sys-user/sys-user.component';
import {SysUserSaveComponent} from './sys-user/sys-user-save/sys-user-save.component';
import { SysParamComponent } from './sys-param/sys-param.component';
import { SysParamSaveComponent } from './sys-param/sys-param-save/sys-param-save.component';
import { SysLogComponent } from './sys-log/sys-log.component';
import { ClassifyInfoComponent } from './classify-info/classify-info.component';
import { ClassifyInfoSaveComponent } from './classify-info/classify-info-save/classify-info-save.component';
import { SysLogSaveComponent } from './sys-log/sys-log-save/sys-log-save.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    NzTreeModule,
    UiOverlayPanelModule,
    SelectButtonModule,
    SysRoutingModule,
  ],
  declarations: [
    SysResourceComponent,
    SysResourceSaveComponent,
    SysRoleComponent,
    SysRoleSaveComponent,
    SysUserComponent,
    SysUserSaveComponent,
    SysParamComponent,
    SysParamSaveComponent,
    SysLogComponent, ClassifyInfoComponent, ClassifyInfoSaveComponent, SysLogSaveComponent
  ],
})
export class SysModule {
}
