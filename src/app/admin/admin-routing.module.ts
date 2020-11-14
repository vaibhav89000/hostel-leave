import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import {AuthGuardService} from '../../app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-admin',
    pathMatch: 'full'
  },
  {
      path: 'login-admin',
      loadChildren: () => import('../login-admin/login-admin.module').then( m => m.LoginAdminPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule),
    canActivate:[AuthGuardService],
    data: {
      role: 'Admin'
    }
  },
  {
    path: 'users',
    loadChildren: () => import('../users/users.module').then( m => m.UsersPageModule),
    canActivate:[AuthGuardService],
    data: {
      role: 'Admin'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
