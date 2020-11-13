import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginStudentPageRoutingModule } from './login-student-routing.module';

import { LoginStudentPage } from './login-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginStudentPageRoutingModule
  ],
  declarations: [LoginStudentPage]
})
export class LoginStudentPageModule {}
