import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ContentGreenLightsComponent } from './content-green-lights.component';
import { ContentGreenLightsDetailComponent } from './content-green-lights-detail.component';
import { ContentGreenLightsPopupComponent } from './content-green-lights-dialog.component';
import { ContentGreenLightsDeletePopupComponent } from './content-green-lights-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ContentGreenLightsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const contentRoute: Routes = [
    {
        path: 'content-green-lights',
        component: ContentGreenLightsComponent,
        resolve: {
            'pagingParams': ContentGreenLightsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'content-green-lights/:id',
        component: ContentGreenLightsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.content.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contentPopupRoute: Routes = [
    {
        path: 'content-green-lights-new',
        component: ContentGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'content-green-lights/:id/edit',
        component: ContentGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'content-green-lights/:id/delete',
        component: ContentGreenLightsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.content.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
