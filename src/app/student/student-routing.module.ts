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
  {
    path: 'student-profile',
    loadChildren: () => import('../student-profile/student-profile.module').then( m => m.StudentProfilePageModule),
    canActivate:[AuthGuardService],
    data: {
      role: 'Student'
    }
  },
  {
    path: 'student-create-application',
    loadChildren: () => import('../student-create-application/student-create-application.module').then( m => m.StudentCreateApplicationPageModule),
    canActivate:[AuthGuardService],
    data: {
      role: 'Student'
    }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
