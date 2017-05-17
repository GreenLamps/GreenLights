import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GreenLightsCategoryGreenLightsModule } from './category/category-green-lights.module';
import { GreenLightsContentGreenLightsModule } from './content/content-green-lights.module';
import { GreenLightsAttachmentGreenLightsModule } from './attachment/attachment-green-lights.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GreenLightsCategoryGreenLightsModule,
        GreenLightsContentGreenLightsModule,
        GreenLightsAttachmentGreenLightsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenLightsEntityModule {}
