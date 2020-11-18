import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../services/users.service';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  form: FormGroup;
  formsubmitted: any;
  admissionNumber: any;
  constructor(private userService: UsersService) { }

  ngOnInit() {
  
  let storedData = Plugins.Storage.get({key: 'authData'})['__zone_symbol__value']
  const parseData = JSON.parse(storedData.value) as {
    userId: string;
    token: string;
    tokenExpirationDate: string;
    email: string;
    role: string;
    admissionNumber: string;
  }
  // console.log('localstorage',parseData['admissionNumber']);
  this.admissionNumber = parseData['admissionNumber'];

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
      this.userService.getProfile(this.admissionNumber)
      .then((data)=>{

        console.log('data',data);
        if(data){
          this.form.patchValue({
            fullName: data['fullName'],
            admissionNumber: data['admissionNumber'],
            year: data['year'],
            gender: data['gender'],
            hostel: data['hostel'],
            roomNumber: data['roomNumber'],
            emailId: data['emailId'],
            phoneNumber: data['phoneNumber']
          });
        }

      },(err)=>{

      })
  }

  update(){
    
  }

 

}
