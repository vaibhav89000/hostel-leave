import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCreateApplicationPage } from './student-create-application.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCreateApplicationPage
  },
  {
    path: ':id',
    component: StudentCreateApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCreateApplicationPageRoutingModule {}
