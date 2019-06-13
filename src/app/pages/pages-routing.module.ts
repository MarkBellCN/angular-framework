import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: 'basicdata', loadChildren: 'app/pages/basicdata/basicdata.module#BasicdataModule'},
      {path: 'infosearch', loadChildren: 'app/pages/infosearch/infosearch.module#InfosearchModule'},
      {path: 'sys', loadChildren: 'app/pages/sys/sys.module#SysModule'},
      {path: 'specialinfo', loadChildren: 'app/pages/specialinfo/specialinfo.module#SpecialinfoModule'},
      {path: 'organization', loadChildren: 'app/pages/organization/organization.module#OrganizationModule'},
      {path: 'statistics', loadChildren: 'app/pages/statistics/statistics.module#StatisticsModule'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
