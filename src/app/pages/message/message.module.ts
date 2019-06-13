import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgZorroAntdModule, CustomDirectiveModule, UiSidebarModule, SelectButtonModule} from "../../framework";
import {MessageService} from './message.service';
import {MessageComponent} from './message/message.component';
import {MessageSaveComponent} from './message/message-save/message-save.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    SelectButtonModule
  ],
  exports: [
    MessageComponent,
    MessageSaveComponent,
  ],
  declarations: [
    MessageComponent,
    MessageSaveComponent,
  ],
  providers:[
    MessageService,
  ]
})
export class MessageModule {
}
