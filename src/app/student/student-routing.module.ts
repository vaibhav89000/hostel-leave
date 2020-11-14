import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-student',
    pathMatch: 'full'
  },
  {
      path: 'login-student',
      loadChildren: () => import('../login-student/login-student.module').then( m => m.LoginStudentPageModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
