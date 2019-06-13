import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {NgZorroAntdModule,NzTreeModule} from '../framework';
import {MenuModule} from './menu/menu.component';
import {MessageModule} from './message/message.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgZorroAntdModule,
    MessageModule,
    MenuModule,
    NzTreeModule
  ],
  declarations: [
    PagesComponent,

  ],
})
export class PagesModule {

}

