import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCreateApplicationPageRoutingModule } from './student-create-application-routing.module';

import { StudentCreateApplicationPage } from './student-create-application.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCreateApplicationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentCreateApplicationPage]
})
export class StudentCreateApplicationPageModule {}
