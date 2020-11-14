import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentViewApplicationPage } from './student-view-application.page';

const routes: Routes = [
  {
    path: '',
    component: StudentViewApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentViewApplicationPageRoutingModule {}
