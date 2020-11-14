import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginStudentPageRoutingModule } from './login-student-routing.module';

import { LoginStudentPage } from './login-student.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginStudentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginStudentPage]
})
export class LoginStudentPageModule {}
