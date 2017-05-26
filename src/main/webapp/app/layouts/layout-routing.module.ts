import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './';
import {NAVBAR_ROUTE} from './navbar/navbar.route';
import {FRONT_HEADER_ROUTE} from '../front/header/front.header.route';

const LAYOUT_ROUTES = [
    NAVBAR_ROUTE,
    FRONT_HEADER_ROUTE,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true }),
    ],
    exports: [
        RouterModule
    ]
})
export class LayoutRoutingModule {}
