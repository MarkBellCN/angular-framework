import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';

import {DepartmentComponent} from './department/department.component';
import {DepartmentSaveComponent} from './department/department-save/department-save.component';
import {EmployeeSaveComponent} from './department/employee-save/employee-save.component';
import {PostComponent} from './post/post.component';
import {PostSaveComponent} from './post/post-save/post-save.component';
import {TeamComponent} from './team/team.component';
import {TeamSaveComponent} from './team/team-save/team-save.component';
import {TeamworkrecordComponent} from './teamworkrecord/teamworkrecord.component';
import {MemberworkrecordComponent} from './memberworkrecord/memberworkrecord.component';
import { ChannelpostComponent } from './channelpost/channelpost.component';

const routes: Routes = [
  { path: 'department', component: DepartmentComponent,
    children: [
      {path: 'save', component: EmployeeSaveComponent},
      {path: 'saveDep', component: DepartmentSaveComponent}
    ],
  },
  { path: 'post', component: PostComponent,
    children: [{path: 'save', component: PostSaveComponent}]
  },
  { path: 'team', component: TeamComponent,
    children: [{path: 'save', component: TeamSaveComponent}]
  },
  { path: 'teamWorkRecord', component: TeamworkrecordComponent},
  { path: 'memberWorkRecord', component: MemberworkrecordComponent},
  { path: 'channelpost', component: ChannelpostComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {

}
