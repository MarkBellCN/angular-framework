import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BasicdataRoutingModule } from './basicdata-routing.module';
import { NgZorroAntdModule,CustomDirectiveModule,UiSidebarModule,SelectButtonModule } from "../../framework";
import { AirportComponent } from './airport/airport.component';
import { AirportSaveComponent } from './airport/airport-save/airport-save.component';
import { AirlineComponent } from './airline/airline.component';
import { AirlineSaveComponent } from './airline/airline-save/airline-save.component';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalSaveComponent } from './terminal/terminal-save/terminal-save.component';
import { RegionComponent } from './region/region.component';
import { RegionSaveComponent } from './region/region-save/region-save.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelSaveComponent } from './channel/channel-save/channel-save.component';
import { GateComponent } from './gate/gate.component';
import { GateSaveComponent } from './gate/gate-save/gate-save.component';
import { CounterComponent } from './counter/counter.component';
import { CounterSaveComponent } from './counter/counter-save/counter-save.component';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { ArticleInfoSaveComponent } from './article-info/article-info-save/article-info-save.component';
import { ContrabandTypeComponent } from './contraband-type/contraband-type.component';
import { ContrabandTypeSaveComponent } from './contraband-type/contraband-type-save/contraband-type-save.component';
import { ContrabandDisposalComponent } from './contraband-disposal/contraband-disposal.component';
import { ContrabandDisposalSaveComponent } from './contraband-disposal/contraband-disposal-save/contraband-disposal-save.component';
import { EventlogComponent } from './eventlog/eventlog.component';
import { EventlogSaveComponent } from './eventlog/eventlog-save/eventlog-save.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { DeviceComponent } from './device/device.component';
import { DeviceSaveComponent } from './device/device-save/device-save.component';
import { RulesortComponent } from './rulesort/rulesort.component';
import { RulesortSaveComponent } from './rulesort/rulesort-save/rulesort-save.component';
import { GatedeviceComponent } from './gatedevice/gatedevice.component';
import { GatedeviceSaveComponent } from './gatedevice/gatedevice-save/gatedevice-save.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BasicdataRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    CustomDirectiveModule,
    UiSidebarModule,
    SelectButtonModule
  ],
  declarations: [
    AirportComponent,
    AirportSaveComponent,
    AirlineComponent,
    AirlineSaveComponent,
    TerminalComponent,
    TerminalSaveComponent,
    RegionComponent,
    RegionSaveComponent,
    ChannelComponent,
    ChannelSaveComponent,
    GateComponent,
    GateSaveComponent,
    CounterComponent,
    CounterSaveComponent,
    ArticleInfoComponent,
    ArticleInfoSaveComponent,
    ContrabandTypeComponent,
    ContrabandTypeSaveComponent,
    ContrabandDisposalComponent,
    ContrabandDisposalSaveComponent,
    EventlogComponent,
    EventlogSaveComponent,
    WorkspaceComponent,
    DeviceComponent,
    DeviceSaveComponent,
    RulesortComponent,
    RulesortSaveComponent,
    GatedeviceComponent,
    GatedeviceSaveComponent,
  ],
})
export class BasicdataModule {
}
