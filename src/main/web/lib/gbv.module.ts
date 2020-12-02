import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {CoreModule} from '@alfresco/adf-core';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from './material.module';
import {GbvScreeningComponent} from "./components/gbv-screening/gbv-screening.component";
import {GbvScreeningDetailComponent} from "./components/gbv-screening/gbv-screening-detail.component";
import {GbvObservationResolve, ROUTES} from './services/gbv-screening.route';

@NgModule({
  imports: [
      MaterialModule,
      FormsModule,
      CommonModule,
      MatDateFormatModule,
      CoreModule,
      RouterModule.forChild(ROUTES),
      CovalentMessageModule,
      CovalentDialogsModule,
      CustomFormsModule,
      LamisSharedModule,
  ],
  declarations: [
   GbvScreeningComponent,
   GbvScreeningDetailComponent
  ],
  providers: [
      //ObservationResolve
  ]
})
export class GbvModule { }
