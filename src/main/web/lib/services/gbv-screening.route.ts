import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observation} from '../model/clinic.model';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import { StiScreeningService } from './sti-screening.service';
import {GbvScreeningComponent} from "../components/gbv-screening/gbv-screening.component";
import {GbvScreeningDetailComponent} from "../components/gbv-screening/gbv-screening-detail.component";

@Injectable({
    providedIn: 'root'
})
export class GbvObservationResolve implements Resolve<Observation> {
 constructor(private service: StiScreeningService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Observation>) => response.ok),
                map((patient: HttpResponse<Observation>) => patient.body)
            );
        }
        return of(<Observation>{});
    }
}

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title:'GBV Screening',
            breadcrumb:'GBV SCREENING'
        },
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: GbvScreeningDetailComponent,
                resolve: {
                    entity: GbvObservationResolve
                },
                data: {
                    authorities: ['ROLE_USER'],
                    title: 'GBV Screening',
                    breadcrumb: 'GBV SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            },
            {
                path: 'patient/:patientId/new',
                component: GbvScreeningComponent,
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'GBV Screening',
                    breadcrumb: 'GBV SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            },
            {
                path: ':id/patient/:patientId/edit',
                component: GbvScreeningComponent,
                resolve: {
                    entity: GbvObservationResolve
                },
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'GBV Screening',
                    breadcrumb: 'GBV SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            }
        ]
    }
];
