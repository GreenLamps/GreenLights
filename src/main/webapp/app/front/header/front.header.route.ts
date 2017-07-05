/**
 * Created by SterOtto on 2017/5/26.
 */
import { Route } from '@angular/router';
import {FrontHeaderComponent} from './front.header.component';

export const FRONT_HEADER_ROUTE: Route = {
    path: 'front',
    component: FrontHeaderComponent,
    data: {
        authorities: [],
        pageTitle: ''
    },
    outlet: 'navbar'
};
