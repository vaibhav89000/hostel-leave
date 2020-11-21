import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../services/users.service';
import { Plugins } from '@capacitor/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  form: FormGroup;
  formsubmitted: any;
  admissionNumber: any;
  successMessage: any;
  errorMessage: any;

  constructor(private userService: UsersService,
    private loadingCtrl: LoadingController,
    private alert : AlertController,
    private router:Router,) { }

  ngOnInit() {

    console.log('page reload student profile');
  
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
      "admissionNumber": new FormControl({value:'',disabled: true},[Validators.required]),
      "year": new FormControl('',[Validators.required]),
      "gender": new FormControl('',[Validators.required]),
      "hostel": new FormControl({value:'',disabled: true},[Validators.required]),
      "roomNumber": new FormControl({value:'',disabled: true},[Validators.required]),
      "emailId": new FormControl({value:'',disabled: true},[Validators.required]),
      "phoneNumber": new FormControl('',[Validators.required]),
    });

    this.fetchProfile();

  }

  fetchProfile(){

    this.loadingCtrl.create({keyboardClose: true, message: 'Updating Profile...'})
    .then(loadingEl =>{ 
      this.userService.getProfile(this.admissionNumber)
      .then((data)=>{
        loadingEl.dismiss();
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
        loadingEl.dismiss();
        console.log('err',err);
      })
    });
      
  }

  update(){
    
    this.formsubmitted = true;
    if(!this.form.valid){
      return;
    }

    let formdata = {
      fullName: this.form.get('fullName').value.toLowerCase(),
      admissionNumber: this.form.get('admissionNumber').value.toLowerCase(),
      year: this.form.get('year').value,
      gender: this.form.get('gender').value,
      hostel: this.form.get('hostel').value,
      roomNumber: this.form.get('roomNumber').value,
      emailId: this.form.get('emailId').value,
      phoneNumber: this.form.get('phoneNumber').value,
    };
    
    this.loadingCtrl.create({keyboardClose: true, message: 'Updating Profile...'})
    .then(loadingEl =>{

      this.userService.registerUser(formdata).then((res)=>{
        loadingEl.dismiss();
        this.successMessage = "Profile Updated successfully";
        this.showAlert('Success!',this.successMessage);
        this.router.navigate(['student','student-view-application']);
        this.formsubmitted = false;
      },err=>{
        loadingEl.dismiss();
        this.errorMessage = err.message;
        this.showAlert('Error',this.errorMessage);
      })
    }
    );

    
  }

  async showAlert(header: string,message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }

 

}
