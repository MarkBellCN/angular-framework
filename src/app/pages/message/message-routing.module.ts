import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';
import {MessageComponent} from './message/message.component';

const routes: Routes = [
  { path: 'simsMessage', component: MessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {

}
