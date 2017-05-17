import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CategoryGreenLightsComponent } from './category-green-lights.component';
import { CategoryGreenLightsDetailComponent } from './category-green-lights-detail.component';
import { CategoryGreenLightsPopupComponent } from './category-green-lights-dialog.component';
import { CategoryGreenLightsDeletePopupComponent } from './category-green-lights-delete-dialog.component';

import { Principal } from '../../shared';

export const categoryRoute: Routes = [
    {
        path: 'category-green-lights',
        component: CategoryGreenLightsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-green-lights/:id',
        component: CategoryGreenLightsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-green-lights-new',
        component: CategoryGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-green-lights/:id/edit',
        component: CategoryGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-green-lights/:id/delete',
        component: CategoryGreenLightsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
