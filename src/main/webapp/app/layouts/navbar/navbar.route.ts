import {Route} from '@angular/router';
import {NavbarComponent} from './navbar.component';
/**
 * Created by SterOtto on 2017/5/26.
 */
export const NAVBAR_ROUTE: Route = {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
};
