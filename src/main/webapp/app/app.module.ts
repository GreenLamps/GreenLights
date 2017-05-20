import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { CKEditorModule } from 'ng2-ckeditor';

import { GreenLightsSharedModule, UserRouteAccessService } from './shared';
import { GreenLightsHomeModule } from './home/home.module';
import { GreenLightsAdminModule } from './admin/admin.module';
import { GreenLightsAccountModule } from './account/account.module';
import { GreenLightsEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        GreenLightsSharedModule,
        GreenLightsHomeModule,
        GreenLightsAdminModule,
        GreenLightsAccountModule,
        GreenLightsEntityModule,
        CKEditorModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class GreenLightsAppModule {}
