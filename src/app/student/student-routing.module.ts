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
  {
    path: 'student-view-application',
    loadChildren: () => import('../student-view-application/student-view-application.module').then( m => m.StudentViewApplicationPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
