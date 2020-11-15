import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';
import {AuthGuardService} from '../../app/services/auth-guard.service';
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
    loadChildren: () => import('../student-view-application/student-view-application.module').then( m => m.StudentViewApplicationPageModule),
    canActivate:[AuthGuardService],
    data: {
      role: 'Student'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
