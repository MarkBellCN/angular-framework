import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {VerifyRecordComponent} from './verify-record/verify-record.component';
import {IdcardComponent} from './idcard/idcard.component';
import {ArrivalDynamicComponent} from './arrival-dynamic/arrival-dynamic.component';
import {DepartureDynamicComponent} from './departure-dynamic/departure-dynamic.component';
import {RegLuggageHComponent} from './reg-luggage-h/reg-luggage-h.component';
import {UnpackRecordComponent} from './unpack-record/unpack-record.component';
import {HandLuggageUnpackRecordComponent} from './hand-luggage-unpack-record/hand-luggage-unpack-record.component';
import {PassengerComponent} from './passenger/passenger.component';
import {SuspectComponent} from './suspect/suspect.component';
import {BoardVerifyRecordComponent} from './board-verify-record/board-verify-record.component';
import {BoardRecordComponent} from './board-record/board-record.component';
import {UnpackArticleComponent} from './unpack-article/unpack-article.component';
import {RegluggageImageComponent} from './regluggage-image/regluggage-image.component';
import {RegluggagePassengeComponent} from './regluggage-image/regluggage-passenge/regluggage-passenge.component';
import {RegluggageCounterComponent} from './regluggage-image/regluggage-counter/regluggage-counter.component';
import {RegluggageLugComponent} from './regluggage-image/regluggage-lug/regluggage-lug.component';
import {HandluggageImageComponent} from './handluggage-image/handluggage-image.component';
import { PreVerifyRecordComponent } from './pre-verify-record/pre-verify-record.component';

const routes: Routes = [
  {
    path: 'verifyRecord', component: VerifyRecordComponent,
  },
  {
    path: 'preVerifyRecord', component: PreVerifyRecordComponent,
  },
  {
    path: 'idcard', component: IdcardComponent,
  },
  {
    path: 'arrivalDynamic', component: ArrivalDynamicComponent,
  },
  {
    path: 'departureDynamic', component: DepartureDynamicComponent,
  },
  {
    path: 'regLuggageH', component: RegLuggageHComponent,
  },
  {
    path: 'unpackRecord', component: UnpackRecordComponent,
  },
  {
    path: 'handLuggageUnpackRecord', component: HandLuggageUnpackRecordComponent,
  },
  {
    path: 'passenger', component: PassengerComponent,
  },
  {
    path: 'suspect', component: SuspectComponent,
  },
  {
    path: 'boardVerifyRecord', component: BoardVerifyRecordComponent,
  },
  {
    path: 'boardRecord', component: BoardRecordComponent,
  },
  {
    path: 'regluggageImage', component: RegluggageImageComponent,
    children: [
      {path: '', redirectTo: 'passenger', pathMatch: 'full'},
      {path: 'passenger', component: RegluggagePassengeComponent},
      {path: 'counter', component: RegluggageCounterComponent},
      {path: 'lug', component: RegluggageLugComponent}
    ],
  },
  {
    path: 'handluggageImage', component: HandluggageImageComponent,
  }, {
    path: 'unpackArticle', component: UnpackArticleComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosearchRoutingModule {

}
