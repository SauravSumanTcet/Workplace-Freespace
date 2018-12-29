import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WfHeaderComponent } from './wf-header/wf-header.component';
import { WfFloorPlanComponent } from './wf-floor-plan/wf-floor-plan.component';
import { WfAppService } from './wf-app.service';
import { WfDeskViewComponent } from './wf-desk-view/wf-desk-view.component';

@NgModule({
  declarations: [
    AppComponent,
    WfHeaderComponent,
    WfFloorPlanComponent,
    WfDeskViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WfAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
