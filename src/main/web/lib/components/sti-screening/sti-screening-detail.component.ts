import { CardViewBoolItemModel, CardViewDateItemModel, CardViewItem, CardViewTextItemModel, NotificationService } from '@alfresco/adf-core';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TdDialogService } from '@covalent/core/dialogs/services/dialog.service';
import { Observation, Patient, StiScreening } from '../../model/clinic.model';
import { ClinicService } from '../../services/clinic.service';
import {StiScreeningService} from '../../services/sti-screening.service';

const STATUS = {
  TREATED: 'YES',
  NOT_TREATED:'NO'
};
const RESULT = {
  NEGATIVE: 'NO',
  POSITIVE: 'YES'
};
@Component({
  selector: 'sti-screening-detail',
  templateUrl: './sti-screening-detail.component.html',
})
export class StiScreeningDetailComponent implements OnInit {
    properties: CardViewItem[] = [];
    entity: StiScreening={}
    observation: Observation={};
    patient: Patient={};

    constructor(private router: Router, private route: ActivatedRoute, private screeningService: StiScreeningService,
      private _dialogService: TdDialogService, private clinicService: ClinicService,
      private notificationService: NotificationService) {
}

ngOnInit() {
this.route.data.subscribe(({entity}) => {
  this.entity = !!entity && entity.body ? entity.body.data.stiScreening : entity.data.stiScreening;
  this.observation = !!entity && entity.body ? entity.body : entity;

  const patientId = this.route.snapshot.paramMap.get('patientId');
  this.clinicService.getPatient(patientId).subscribe((res) => this.patient = res);
  this.buildProperties();
});
}

edit() {
this.router.navigate(['/', 'sti-screening', this.observation.id, 'patient', this.patient.uuid, 'edit']);
}

delete() {
this._dialogService.openConfirm({
  title: 'Confirm',
  message: 'Do you want to delete this sti screening, action cannot be reversed?',
  cancelButton: 'No',
  acceptButton: 'Yes',
  width: '500px',
}).afterClosed().subscribe((accept: boolean) => {
  if (accept) {
      this.screeningService.delete(this.observation.id).subscribe((res) => {
          if (res.ok) {
              this.router.navigate(['patients']);
          } else {
              this.notificationService.showError('Error deleting screening, please try again');
          }
      });
  } else {
      // DO SOMETHING ELSE
  }
});
}

buildProperties() {
this.properties.push(new CardViewDateItemModel({
  key: 'ds',
  value: this.observation.date,
  label: 'Date of Screening',
  format: 'dd MMM, yyyy'
}));

this.properties.push(new CardViewTextItemModel({
  label: 'Result of STI Screening',
  key: 'adr',
  value: RESULT[this.entity.screeningResult]
}));
if(this.entity.screeningResult=='YES'){
this.properties.push(new CardViewTextItemModel(
  {
    label:'STI Treament Status',
    key:'adr',
    value:STATUS[this.entity.treatmentStatus]
  }))
}
  if(this.entity.treatmentStatus=='YES'){
    this.properties.push(new CardViewDateItemModel({
      key: 'ds',
      value: this.entity.dateTreated,
      label: 'Date Treated',
      format: 'dd MMM, yyyy'
  }));
  }
 
}

previousState() {
window.history.back();
}

}

