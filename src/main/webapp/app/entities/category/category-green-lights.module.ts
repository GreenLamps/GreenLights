import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenLightsSharedModule } from '../../shared';
import {
    CategoryGreenLightsService,
    CategoryGreenLightsPopupService,
    CategoryGreenLightsComponent,
    CategoryGreenLightsDetailComponent,
    CategoryGreenLightsDialogComponent,
    CategoryGreenLightsPopupComponent,
    CategoryGreenLightsDeletePopupComponent,
    CategoryGreenLightsDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        GreenLightsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CategoryGreenLightsComponent,
        CategoryGreenLightsDetailComponent,
        CategoryGreenLightsDialogComponent,
        CategoryGreenLightsDeleteDialogComponent,
        CategoryGreenLightsPopupComponent,
        CategoryGreenLightsDeletePopupComponent,
    ],
    entryComponents: [
        CategoryGreenLightsComponent,
        CategoryGreenLightsDialogComponent,
        CategoryGreenLightsPopupComponent,
        CategoryGreenLightsDeleteDialogComponent,
        CategoryGreenLightsDeletePopupComponent,
    ],
    providers: [
        CategoryGreenLightsService,
        CategoryGreenLightsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenLightsCategoryGreenLightsModule {}
