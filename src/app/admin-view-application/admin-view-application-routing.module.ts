import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminViewApplicationPage } from './admin-view-application.page';

const routes: Routes = [
  {
    path: '',
    component: AdminViewApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminViewApplicationPageRoutingModule {}
