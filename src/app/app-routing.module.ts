import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },
  // {
  //   path: 'login-admin',
  //   loadChildren: () => import('./login-admin/login-admin.module').then( m => m.LoginAdminPageModule)
  // },
  // {
  //   path: 'login-student',
  //   loadChildren: () => import('./login-student/login-student.module').then( m => m.LoginStudentPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
