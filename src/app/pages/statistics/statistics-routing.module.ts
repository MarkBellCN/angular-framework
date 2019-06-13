import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';
import {StatisticsIndexComponent} from './statistics-index/statistics-index.component';
import {SimsFlightStatComponent} from './sims-flight-stat/sims-flight-stat.component';
import {SimsPassengerStatComponent} from './sims-passenger-stat/sims-passenger-stat.component';
import {SimsLuggageStatComponent} from './sims-luggage-stat/sims-luggage-stat.component';
import {SimsGateStatComponent} from './sims-gate-stat/sims-gate-stat.component';
import {SimsChannelStatComponent} from './sims-channel-stat/sims-channel-stat.component';
import {SimsEmpworkdailyStatComponent} from './sims-empworkdaily-stat/sims-empworkdaily-stat.component';
import {SimsTeamworkdailyStatComponent} from './sims-teamworkdaily-stat/sims-teamworkdaily-stat.component';
import { SimsPreVerifyStatComponent } from './sims-pre-verify-stat/sims-pre-verify-stat.component';
const routes: Routes = [
  { path: 'statisticsIndex', component: StatisticsIndexComponent
  },
  { path: 'simsFlightStat', component: SimsFlightStatComponent
  },
  { path: 'simsPassengerStat', component: SimsPassengerStatComponent
  },
  { path: 'simsLuggageStat', component: SimsLuggageStatComponent
  },
  { path: 'simsGateStat', component: SimsGateStatComponent
  },
  { path: 'simsChannelStat', component: SimsChannelStatComponent
  },
  { path: 'simsEmpWorkDailyStat', component: SimsEmpworkdailyStatComponent
  },
  { path: 'simsTeamWorkDailyStat', component: SimsTeamworkdailyStatComponent
  },
  { path: 'simsPreVerifyStat', component: SimsPreVerifyStatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {

}
