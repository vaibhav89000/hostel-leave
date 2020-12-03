import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminViewApplicationPageRoutingModule } from './admin-view-application-routing.module';

import { AdminViewApplicationPage } from './admin-view-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminViewApplicationPageRoutingModule
  ],
  declarations: [AdminViewApplicationPage]
})
export class AdminViewApplicationPageModule {}
