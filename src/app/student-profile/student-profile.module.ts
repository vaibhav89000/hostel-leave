import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentProfilePageRoutingModule } from './student-profile-routing.module';

import { StudentProfilePage } from './student-profile.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentProfilePage]
})
export class StudentProfilePageModule {}
