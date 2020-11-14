import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentViewApplicationPageRoutingModule } from './student-view-application-routing.module';

import { StudentViewApplicationPage } from './student-view-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentViewApplicationPageRoutingModule
  ],
  declarations: [StudentViewApplicationPage]
})
export class StudentViewApplicationPageModule {}
