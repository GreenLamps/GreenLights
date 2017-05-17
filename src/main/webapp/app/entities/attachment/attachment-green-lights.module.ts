import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenLightsSharedModule } from '../../shared';
import {
    AttachmentGreenLightsService,
    AttachmentGreenLightsPopupService,
    AttachmentGreenLightsComponent,
    AttachmentGreenLightsDetailComponent,
    AttachmentGreenLightsDialogComponent,
    AttachmentGreenLightsPopupComponent,
    AttachmentGreenLightsDeletePopupComponent,
    AttachmentGreenLightsDeleteDialogComponent,
    attachmentRoute,
    attachmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...attachmentRoute,
    ...attachmentPopupRoute,
];

@NgModule({
    imports: [
        GreenLightsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AttachmentGreenLightsComponent,
        AttachmentGreenLightsDetailComponent,
        AttachmentGreenLightsDialogComponent,
        AttachmentGreenLightsDeleteDialogComponent,
        AttachmentGreenLightsPopupComponent,
        AttachmentGreenLightsDeletePopupComponent,
    ],
    entryComponents: [
        AttachmentGreenLightsComponent,
        AttachmentGreenLightsDialogComponent,
        AttachmentGreenLightsPopupComponent,
        AttachmentGreenLightsDeleteDialogComponent,
        AttachmentGreenLightsDeletePopupComponent,
    ],
    providers: [
        AttachmentGreenLightsService,
        AttachmentGreenLightsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenLightsAttachmentGreenLightsModule {}
