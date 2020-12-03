import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminViewApplicationPageRoutingModule } from './admin-view-application-routing.module';

import { AdminViewApplicationPage } from './admin-view-application.page';
import { StatusChangeComponent } from '../status-change/status-change.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminViewApplicationPageRoutingModule
  ],
  declarations: [AdminViewApplicationPage,StatusChangeComponent],
  entryComponents: [StatusChangeComponent]
})
export class AdminViewApplicationPageModule {}
