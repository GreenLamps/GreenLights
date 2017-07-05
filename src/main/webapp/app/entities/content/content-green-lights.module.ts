import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenLightsSharedModule } from '../../shared';
import { CKEditorModule } from 'ng2-ckeditor';
import {
    ContentGreenLightsService,
    ContentGreenLightsPopupService,
    ContentGreenLightsComponent,
    ContentGreenLightsDetailComponent,
    ContentGreenLightsDialogComponent,
    ContentGreenLightsPopupComponent,
    ContentGreenLightsDeletePopupComponent,
    ContentGreenLightsDeleteDialogComponent,
    contentRoute,
    contentPopupRoute,
    ContentGreenLightsResolvePagingParams,
} from './';
import {ImageUploadModule} from '../../image-upload/image-upload.module';

const ENTITY_STATES = [
    ...contentRoute,
    ...contentPopupRoute,
];

@NgModule({
    imports: [
        GreenLightsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        CKEditorModule,
        ImageUploadModule.forRoot(),
    ],
    declarations: [
        ContentGreenLightsComponent,
        ContentGreenLightsDetailComponent,
        ContentGreenLightsDialogComponent,
        ContentGreenLightsDeleteDialogComponent,
        ContentGreenLightsPopupComponent,
        ContentGreenLightsDeletePopupComponent,
    ],
    entryComponents: [
        ContentGreenLightsComponent,
        ContentGreenLightsDialogComponent,
        ContentGreenLightsPopupComponent,
        ContentGreenLightsDeleteDialogComponent,
        ContentGreenLightsDeletePopupComponent,
    ],
    providers: [
        ContentGreenLightsService,
        ContentGreenLightsPopupService,
        ContentGreenLightsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenLightsContentGreenLightsModule {}
