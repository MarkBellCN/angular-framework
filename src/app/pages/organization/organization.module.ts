import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule,CustomDirectiveModule,UiSidebarModule,SelectButtonModule,ContextMenuModule,UiOverlayPanelModule } from "../../framework";
import { OrganizationRoutingModule} from './organization-routing.module';
import { DepartmentComponent } from './department/department.component';
import { DepartmentSaveComponent } from './department/department-save/department-save.component';
import { PostComponent } from './post/post.component';
import { PostSaveComponent } from './post/post-save/post-save.component';
import { TeamComponent } from './team/team.component';
import { TeamSaveComponent } from './team/team-save/team-save.component';
import { TeamworkrecordComponent } from './teamworkrecord/teamworkrecord.component';
import { MemberworkrecordComponent } from './memberworkrecord/memberworkrecord.component';
import { EmployeeSaveComponent } from './department/employee-save/employee-save.component';
import { ChannelpostComponent } from './channelpost/channelpost.component';
import { ChannelpostSaveComponent } from './channelpost/channelpost-save/channelpost-save.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    SelectButtonModule,
    ContextMenuModule,
    UiOverlayPanelModule,
    OrganizationRoutingModule
  ],
  declarations: [
    DepartmentComponent,
    DepartmentSaveComponent,
    PostComponent,
    PostSaveComponent,
    TeamComponent,
    TeamSaveComponent,
    TeamworkrecordComponent,
    MemberworkrecordComponent,
    EmployeeSaveComponent,
    ChannelpostComponent,
    ChannelpostSaveComponent,
  ]
})
export class OrganizationModule { }
