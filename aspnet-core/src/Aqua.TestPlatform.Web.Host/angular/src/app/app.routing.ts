import { Routes, RouterModule } from '@angular/router';
import { ArkIndexComponent } from './ark/ark-index/ark-index.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: '',
        component: IndexComponent,
        pathMatch: 'full'
      },
      {
        path: 'ark',
        component: ArkIndexComponent,
        children: [

        ]
      },
    ]
  },
];

export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled', scrollPositionRestoration: 'enabled' });
