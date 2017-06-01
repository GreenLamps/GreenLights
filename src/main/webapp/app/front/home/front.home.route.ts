import { Route } from '@angular/router';
import {FrontHomeComponent} from './front.home.component';

export const FRONT_HOME_ROUTE: Route = {
    path: 'front',
    component: FrontHomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
