import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../services/users.service';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  form: FormGroup;
  formsubmitted: any;
  constructor(private userService: UsersService) { }

  ngOnInit() {

    this.formsubmitted = false;

    this.form = new FormGroup({
      "fullName": new FormControl('',[Validators.required]),
      "admissionNumber": new FormControl('',[Validators.required]),
      "year": new FormControl('',[Validators.required]),
      "gender": new FormControl('',[Validators.required]),
      "hostel": new FormControl('',[Validators.required]),
      "roomNumber": new FormControl('',[Validators.required]),
      "emailId": new FormControl('',[Validators.required]),
      "phoneNumber": new FormControl('',[Validators.required]),
    });

    this.fetchProfile();

  }

  fetchProfile(){
      this.userService.getProfile()
  }

  update(){
    
  }

}
