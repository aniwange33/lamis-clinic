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
import {ROUTES} from './../services/sti-screening.route';

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
    StiScreeningComponent
  ],
  providers: [
      //ObservationResolve
  ]
})
export class StiModule { }
