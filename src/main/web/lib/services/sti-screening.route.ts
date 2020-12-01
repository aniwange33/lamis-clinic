import { StiScreeningDetailComponent } from './../components/sti-screening/sti-screening-detail.component';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observation} from '../model/clinic.model';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import { StiScreeningService } from './sti-screening.service';
import { StiScreeningComponent} from '../components/sti-screening/sti-screening.component';

@Injectable({
    providedIn: 'root'
})
export class StiObservationResolve implements Resolve<Observation> {
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
            title: 'STI Screening',
            breadcrumb: 'STI SCREENING'
        },
        children: [
            {
                path: ':id/patient/:patientId/view',
                component: StiScreeningComponent,
                resolve: {
                    entity: StiObservationResolve
                },
                data: {
                    authorities: ['ROLE_USER'],
                    title: 'STI Screening',
                    breadcrumb: 'STI SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            },
            {
                path: 'patient/:patientId/new',
                component: StiScreeningComponent,
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'STI Screening',
                    breadcrumb: 'STI SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            },
            {
                path: ':id/patient/:patientId/edit',
                component: StiScreeningComponent,
                resolve: {
                    entity: StiObservationResolve
                },
                data: {
                    authorities: ['ROLE_DEC'],
                    title: 'STI Screening',
                    breadcrumb: 'STI SCREENING'
                },
                //canActivate: [UserRouteAccessService]
            }
        ]
    }
];
