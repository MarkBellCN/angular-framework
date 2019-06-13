import {RouterModule, Routes, ActivatedRoute} from '@angular/router';
import {NgModule} from '@angular/core';

import {AirportComponent} from './airport/airport.component';
import {AirportSaveComponent} from './airport/airport-save/airport-save.component';
import {AirlineComponent} from './airline/airline.component';
import {AirlineSaveComponent} from './airline/airline-save/airline-save.component';
import {TerminalComponent} from './terminal/terminal.component';
import {TerminalSaveComponent} from './terminal/terminal-save/terminal-save.component';
import {RegionComponent} from './region/region.component';
import {RegionSaveComponent} from './region/region-save/region-save.component';
import {ChannelComponent} from './channel/channel.component';
import {ChannelSaveComponent} from './channel/channel-save/channel-save.component';
import {GateComponent} from './gate/gate.component';
import {GateSaveComponent} from './gate/gate-save/gate-save.component';
import {CounterComponent} from './counter/counter.component';
import {CounterSaveComponent} from './counter/counter-save/counter-save.component';
import {ArticleInfoComponent} from './article-info/article-info.component';
import {ArticleInfoSaveComponent} from './article-info/article-info-save/article-info-save.component';
import {ContrabandTypeComponent} from './contraband-type/contraband-type.component';
import {ContrabandTypeSaveComponent} from './contraband-type/contraband-type-save/contraband-type-save.component';
import {ContrabandDisposalComponent} from './contraband-disposal/contraband-disposal.component';
import {ContrabandDisposalSaveComponent} from './contraband-disposal/contraband-disposal-save/contraband-disposal-save.component';
import {EventlogComponent} from './eventlog/eventlog.component';
import {EventlogSaveComponent} from './eventlog/eventlog-save/eventlog-save.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {DeviceComponent} from './device/device.component';
import {DeviceSaveComponent} from './device/device-save/device-save.component';
import {RulesortComponent} from './rulesort/rulesort.component';
import {RulesortSaveComponent} from './rulesort/rulesort-save/rulesort-save.component';
import {GatedeviceComponent} from './gatedevice/gatedevice.component';
import {GatedeviceSaveComponent} from './gatedevice/gatedevice-save/gatedevice-save.component';

const routes: Routes = [
  { path: 'airport', component: AirportComponent,
    children: [{path: 'save', component: AirportSaveComponent}],
  },
  { path: 'airline', component: AirlineComponent,
    children: [{path: 'save', component: AirlineSaveComponent}],
  },
  { path: 'terminal', component: TerminalComponent,
    children: [{path: 'save', component: TerminalSaveComponent}],
  },
  { path: 'region', component: RegionComponent,
    children: [{path: 'save', component: RegionSaveComponent}],
  },
  { path: 'channel', component: ChannelComponent,
    children: [{path: 'save', component: ChannelSaveComponent}],
  },
  { path: 'gate', component: GateComponent,
    children: [{path: 'save', component: GateSaveComponent}],
  },
  { path: 'counter', component: CounterComponent,
    children: [{path: 'save', component: CounterSaveComponent}],
  },
  { path: 'articleInfo', component: ArticleInfoComponent,
    children: [{path: 'save', component: ArticleInfoSaveComponent}],
  },
  { path: 'contrabandType', component: ContrabandTypeComponent,
    children: [{path: 'save', component: ContrabandTypeSaveComponent}],
  },
  { path: 'contrabandDisposition', component: ContrabandDisposalComponent,
    children: [{path: 'save', component: ContrabandDisposalSaveComponent}],
  },
  { path: 'eventLog', component: EventlogComponent,
    children: [{path: 'save', component: EventlogSaveComponent}],
  },
  { path: 'workspace', component: WorkspaceComponent,
  },
  // 闸机信息管理
  { path: 'deviceInfoT', component: DeviceComponent,
    children: [{path: 'save', component: DeviceSaveComponent}],
  },
  { path: 'ruleSort', component: RulesortComponent,
    children: [{path: 'save', component: RulesortSaveComponent}],
  },
  // 登机口设备管理
  { path: 'device', component: GatedeviceComponent,
    children: [{path: 'save', component: GatedeviceSaveComponent}],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicdataRoutingModule {

}
