import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
    path: 'manage',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
