import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {LamisSharedModule, MatDateFormatModule} from '@lamis/web-core';
import {CoreModule} from '@alfresco/adf-core';
import {RouterModule} from '@angular/router';
import {CovalentDialogsModule, CovalentMessageModule} from '@covalent/core';
import {CustomFormsModule} from 'ng2-validation';
import { StiScreeningComponent } from '../components/sti-screening/sti-screening.component';
import { MaterialModule } from '../material.module';
import {StiObservationResolve, ROUTES} from './../services/sti-screening.route';
import { StiScreeningDetailComponent } from '../components/sti-screening/sti-screening-detail.component';

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
    StiScreeningComponent,
    StiScreeningDetailComponent
  ],
  providers: [
      //ObservationResolve
  ]
})
export class StiModule { }
