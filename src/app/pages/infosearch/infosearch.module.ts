import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfosearchRoutingModule} from './infosearch-routing.module';
import {NgZorroAntdModule, CustomDirectiveModule, UiSidebarModule, SelectButtonModule} from '../../framework';
import {VerifyRecordComponent} from './verify-record/verify-record.component';
import {IdcardComponent} from './idcard/idcard.component';
import {IdcardSaveComponent} from './idcard/idcard-save/idcard-save.component';
import {ArrivalDynamicComponent} from './arrival-dynamic/arrival-dynamic.component';
import {DepartureDynamicComponent} from './departure-dynamic/departure-dynamic.component';
import {ArrivalDynamicSaveComponent} from './arrival-dynamic/arrival-dynamic-save/arrival-dynamic-save.component';
import {DepartureDynamicSaveComponent} from './departure-dynamic/departure-dynamic-save/departure-dynamic-save.component';
import {VerifyRecordSaveComponent} from './verify-record/verify-record-save/verify-record-save.component';
import {RegLuggageHComponent} from './reg-luggage-h/reg-luggage-h.component';
import {UnpackRecordComponent} from './unpack-record/unpack-record.component';
import {HandLuggageUnpackRecordComponent} from './hand-luggage-unpack-record/hand-luggage-unpack-record.component';
import {HandUnpackSaveComponent} from './hand-luggage-unpack-record/hand-unpack-save/hand-unpack-save.component';
import {UnpackRecordSaveComponent} from './unpack-record/unpack-record-save/unpack-record-save.component';
import {RegLuggageHSaveComponent} from './reg-luggage-h/reg-luggage-h-save/reg-luggage-h-save.component';
import {PassengerComponent} from './passenger/passenger.component';
import {PassengerSaveComponent} from './passenger/passenger-save/passenger-save.component';
import {BoardrecordListComponent} from './passenger/boardrecord-list/boardrecord-list.component';
import {GrouppassengerDetailsComponent} from './passenger/grouppassenger-details/grouppassenger-details.component';
import {HandUnpackListComponent} from './hand-luggage-unpack-record/hand-unpack-list/hand-unpack-list.component';
import {SuspectComponent} from './suspect/suspect.component';
import {BoardVerifyRecordComponent} from './board-verify-record/board-verify-record.component';
import {BoardRecordComponent} from './board-record/board-record.component';
import {SuspectSaveComponent} from './suspect/suspect-save/suspect-save.component';
import {PassengerDetailsComponent} from './passenger/passenger-details/passenger-details.component';
import {BoardRecordSaveComponent} from './board-record/board-record-save/board-record-save.component';
import {BoardVerifyRecordSaveComponent} from './board-verify-record/board-verify-record-save/board-verify-record-save.component';
import {VerifyrecordListComponent} from './passenger/verifyrecord-list/verifyrecord-list.component';
import {UnpackListComponent} from './passenger/unpack-list/unpack-list.component';
import {RegluggageListComponent} from './passenger/regluggage-list/regluggage-list.component';
import {RegluggageImageComponent} from './regluggage-image/regluggage-image.component';
import {HandluggageImageComponent} from './handluggage-image/handluggage-image.component';
import {UnpackRecordListComponent} from './unpack-record/unpack-record-list/unpack-record-list.component';
import {UnpackArticleComponent} from './unpack-article/unpack-article.component';
import {RegluggagePassengeComponent} from './regluggage-image/regluggage-passenge/regluggage-passenge.component';
import {RegluggageCounterComponent} from './regluggage-image/regluggage-counter/regluggage-counter.component';
import {RegluggageLugComponent} from './regluggage-image/regluggage-lug/regluggage-lug.component';
import {UnpackArticleDetailComponent} from './unpack-article/unpack-article-detail/unpack-article-detail.component';
import { PreVerifyRecordComponent } from './pre-verify-record/pre-verify-record.component';
import { PreVerifyRecordSaveComponent } from './pre-verify-record/pre-verify-record-save/pre-verify-record-save.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InfosearchRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    SelectButtonModule
  ],
  declarations: [
    VerifyRecordComponent,
    IdcardComponent,
    IdcardSaveComponent,
    ArrivalDynamicComponent,
    DepartureDynamicComponent,
    ArrivalDynamicSaveComponent,
    DepartureDynamicSaveComponent,
    VerifyRecordSaveComponent,
    RegLuggageHComponent,
    UnpackRecordComponent,
    HandLuggageUnpackRecordComponent,
    HandUnpackSaveComponent,
    UnpackRecordSaveComponent,
    RegLuggageHSaveComponent,
    PassengerComponent,
    PassengerSaveComponent,
    BoardrecordListComponent,
    GrouppassengerDetailsComponent,
    HandUnpackListComponent,
    SuspectComponent,
    BoardVerifyRecordComponent,
    BoardRecordComponent,
    SuspectSaveComponent,
    PassengerDetailsComponent,
    BoardRecordSaveComponent,
    BoardVerifyRecordSaveComponent,
    VerifyrecordListComponent,
    UnpackListComponent,
    RegluggageListComponent,
    RegluggageImageComponent,
    HandluggageImageComponent,
    UnpackRecordListComponent,
    UnpackArticleComponent,
    RegluggagePassengeComponent,
    RegluggageCounterComponent,
    RegluggageLugComponent,
    UnpackArticleDetailComponent,
    PreVerifyRecordComponent,
    PreVerifyRecordSaveComponent,

  ],
})
export class InfosearchModule {
}
