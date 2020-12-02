import {
    CardViewBoolItemModel,
    CardViewDateItemModel,
    CardViewItem,
    CardViewTextItemModel,
    NotificationService
} from '@alfresco/adf-core';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TdDialogService} from '@covalent/core';
import {GbvScreening, Observation, Patient, StiScreening} from '../../model/clinic.model';
import {ClinicService} from '../../services/clinic.service';
import {StiScreeningService} from '../../services/sti-screening.service';

const RESULT = {
    NEGATIVE: 'Negative',
    POSITIVE: 'Positive',
    SUSPICIOUS: 'Suspicious GVB'
};

const STI_TYPE = {
    Chlamydia: 'SEXUAL',
    Gonorrhea: 'NON SEXUAL',
};
const TYPE = {
    FIRST_TIME: 'First Time',
    FOLLOWUP: 'Followup after previous negative result',
    POST_TREATMENT_FOLLOWUP: 'Post-treatment Followup'
};

@Component({
    selector: 'gbv-screening-detail',
    templateUrl: './gbv-screening-detail.component.html',
})
export class GbvScreeningDetailComponent implements OnInit {
    properties: CardViewItem[] = [];
    entity: GbvScreening = {}
    observation: Observation = {};
    patient: Patient = {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private screeningService: StiScreeningService,
        private _dialogService: TdDialogService,
        private clinicService: ClinicService,
        private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.route.data.subscribe(({entity}) => {
            this.entity = !!entity && entity.body ? entity.body.data.gbvScreening: entity.data.gbvScreening;
            this.observation = !!entity && entity.body ? entity.body : entity;
            const patientId = this.route.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => this.patient = res);
            this.buildProperties();
            console.log(this.patient)
        });
    }

    edit() {
        console.log("calling edit function")
        this.router.navigate(['/', 'gbv-screening', this.observation.id, 'patient', this.patient.uuid, 'edit']);
    }

    delete() {
        this._dialogService.openConfirm({
            title: 'Confirm',
            message: 'Do you want to delete this GBV screening, action cannot be reversed?',
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
            key: 'na',
            value: TYPE[this.entity.screeningType],
            label: 'Screening Type',
        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'GBV Type',
            key: 'fs',
            value: STI_TYPE[this.entity.gbvType]

        }));
        this.properties.push(new CardViewTextItemModel({
            label: 'Result',
            key: 'adr',
            value: RESULT[this.entity.screeningResult]
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Reported?',
            key: 'bw',
            value: this.entity.reported
        }));
        this.properties.push(new CardViewBoolItemModel({
            label: 'Placed on PEP?',
            key: 'bw',
            value: this.entity.placeOnPep
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.dateReported,
            label: 'Date of Reported',
            format: 'dd MMM, yyyy'
        }));
        this.properties.push(new CardViewDateItemModel({
            key: 'ds',
            value: this.entity.pepDate,
            label: 'Date of placed on PEP',
            format: 'dd MMM, yyyy'
        }));
    }

    previousState() {
        window.history.back();
    }

}

