import {Component, OnInit} from '@angular/core';
import * as moment_ from 'moment';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ClinicService} from '../../services/clinic.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService, DATE_FORMAT} from '@lamis/web-core';
import {StiScreening, Patient, Observation} from '../../model/clinic.model';
import {StiScreeningService} from '../../services/sti-screening.service';

const moment = moment_;

@Component({
    selector: 'sti-screening',
    templateUrl: './sti-screening.component.html',
})
export class StiScreeningComponent implements OnInit {
    entity: StiScreening = {};
    patient: Patient = {};
    observation: Observation = {};
    today = moment();
    isSaving: boolean = false;

    constructor(
        private clinicService: ClinicService,
        private screeningService: StiScreeningService,
        protected notification: NotificationService,
        protected activatedRoute: ActivatedRoute,
        private appLoaderService: AppLoaderService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({entity}) => {
            this.observation = !!entity && entity.body ? entity.body : entity;
            if (!!this.observation) {
                this.entity = this.observation.data.stiScreening;
                this.entity.dateScreened = this.entity.dateScreened != null ? moment(this.entity.dateScreened) : null;
                this.entity.dateTreated = this.entity.dateTreated != null ? moment(this.entity.dateTreated) : null;
            } else {
                this.observation = {};
            }

            if (this.entity === undefined) {
                this.entity = {};
            }
            const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
            this.clinicService.getPatient(patientId).subscribe((res) => {
                this.patient = res;
                if (!!this.entity) {
                    this.screeningService.getScreeningByPatient(res.id).subscribe(r => {
                        this.entity = r.body && r.body.data;
                        this.observation = r.body;
                    });
                }
            });
        });
    }

    previousState() {
        window.history.back();
    }

    setStiType(stiTye: string) {
        console.log("amos")
        this.entity.stiType = stiTye;
    }

    save() {
        console.log(this.entity)
        //this.submitButton.disabled = true;
        //this.progressBar.mode = 'indeterminate';
        this.isSaving = true;
        this.appLoaderService.open('Saving cancer screening..');
        if(this.entity.stiType !== 'Others'){
            this.entity.others = '';
        }

        const data = {
            id: this.observation && this.observation.id || null,
            patient: this.patient,
            date: this.entity.dateScreened.format(DATE_FORMAT),
            facility: this.patient.facility,
            type: 'STI_SCREENING',
            data: {
                stiScreening: Object.assign({}, this.entity, {
                    dateScreened: this.entity.dateScreened != null && this.entity.dateScreened.isValid() ?
                        this.entity.dateScreened.format(DATE_FORMAT) : null,
                    dateTreated: this.entity.dateTreated != null && this.entity.dateTreated.isValid() ?
                        this.entity.dateTreated.format(DATE_FORMAT) : null,
                })
            }
        };
        if (!!this.observation.id) {
            this.subscribeToSaveResponse(this.screeningService.update(data));
        } else {
            this.subscribeToSaveResponse(this.screeningService.save(data));
        }
    }


    subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe(
            (res: HttpResponse<any>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.onError(res.message);
            });
    }

    private onSaveSuccess(resul: any) {
        this.appLoaderService.close();
        this.isSaving = false;
        this.notification.showInfo('STI screening successfully saved');
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
        this.appLoaderService.close();
        //this.submitButton.disabled = true;
        this.notification.showError('Error occurred saving STI screening; try again');
        //this.progressBar.mode = 'determinate';
    }

    protected onError(errorMessage: string) {
        this.appLoaderService.close();
        this.notification.showError(errorMessage);
    }
}
