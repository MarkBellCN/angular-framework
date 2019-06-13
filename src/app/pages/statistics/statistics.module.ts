import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatisticsRoutingModule } from './statistics-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgZorroAntdModule,CustomDirectiveModule,UiSidebarModule,SelectButtonModule } from "../../framework";
import { StatisticsService } from "../statistics/statistics.service";
import { StatisticsIndexComponent } from './statistics-index/statistics-index.component';
import { SimsFlightStatComponent } from './sims-flight-stat/sims-flight-stat.component';
import { SimsPassengerStatComponent } from './sims-passenger-stat/sims-passenger-stat.component';
import { SimsLuggageStatComponent } from './sims-luggage-stat/sims-luggage-stat.component';
import { SimsGateStatComponent } from './sims-gate-stat/sims-gate-stat.component';
import { SimsChannelStatComponent } from './sims-channel-stat/sims-channel-stat.component';
import { SimsEmpworkdailyStatComponent } from './sims-empworkdaily-stat/sims-empworkdaily-stat.component';
import { SimsTeamworkdailyStatComponent } from './sims-teamworkdaily-stat/sims-teamworkdaily-stat.component';
import { SimsPreVerifyStatComponent } from './sims-pre-verify-stat/sims-pre-verify-stat.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StatisticsRoutingModule,
    CommonModule,
    NgxEchartsModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    SelectButtonModule,
  ],
  declarations: [
    StatisticsIndexComponent,
     SimsFlightStatComponent, 
     SimsPassengerStatComponent, 
     SimsLuggageStatComponent, 
     SimsGateStatComponent, SimsChannelStatComponent, SimsEmpworkdailyStatComponent, SimsTeamworkdailyStatComponent, SimsPreVerifyStatComponent
    ],
  providers:[
    StatisticsService
  ]
})
export class StatisticsModule { }
