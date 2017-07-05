import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AttachmentGreenLightsComponent } from './attachment-green-lights.component';
import { AttachmentGreenLightsDetailComponent } from './attachment-green-lights-detail.component';
import { AttachmentGreenLightsPopupComponent } from './attachment-green-lights-dialog.component';
import { AttachmentGreenLightsDeletePopupComponent } from './attachment-green-lights-delete-dialog.component';

import { Principal } from '../../shared';

export const attachmentRoute: Routes = [
    {
        path: 'attachment-green-lights',
        component: AttachmentGreenLightsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'attachment-green-lights/:id',
        component: AttachmentGreenLightsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attachmentPopupRoute: Routes = [
    {
        path: 'attachment-green-lights-new',
        component: AttachmentGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attachment-green-lights/:id/edit',
        component: AttachmentGreenLightsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attachment-green-lights/:id/delete',
        component: AttachmentGreenLightsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'greenLightsApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
