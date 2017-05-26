import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GreenLightsSharedModule} from '../../shared/shared.module';
import {FRONT_HOME_ROUTE} from './front.home.route';
import {FrontHomeComponent} from './front.home.component';

@NgModule({
    imports: [
        GreenLightsSharedModule,
        RouterModule.forRoot([ FRONT_HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        FrontHomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrontHomeModule {}
