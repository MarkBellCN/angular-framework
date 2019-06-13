import {ExtraOptions, RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';
import {UpdpsdComponent} from './pages/uptpsd/updpsd.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
  {path: 'uptpsd', component: UpdpsdComponent, outlet: 'reset'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
