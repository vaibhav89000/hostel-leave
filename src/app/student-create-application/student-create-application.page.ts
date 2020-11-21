import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { callInstance } from '@ionic-native/core/decorators/common';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {UsersService} from '../services/users.service';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-student-create-application',
  templateUrl: './student-create-application.page.html',
  styleUrls: ['./student-create-application.page.scss'],
})
export class StudentCreateApplicationPage implements OnInit {

  form: FormGroup;
  formsubmitted: any;
  currentDate: any;
  errorMessage: any;
  successMessage: any;
  constructor(private loadingCtrl: LoadingController,
    private alert : AlertController,
    private userservice: UsersService,
    private navCtrl: NavController,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
 
    // To get todays date
    let currentTime = new Date();

    let currentOffset = currentTime.getTimezoneOffset();

    let ISTOffset = 330;   // IST offset UTC +5:30 

    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    let yyyy = ISTTime.getFullYear();
    let mm = ISTTime.getMonth()+1;
    let dd = ISTTime.getDate();
    this.currentDate = yyyy+'-'+mm+'-'+dd;
    
    let storedData = Plugins.Storage.get({key: 'authData'})['__zone_symbol__value']
    const parseData = JSON.parse(storedData.value) as {
      userId: string;
      token: string;
      tokenExpirationDate: string;
      email: string;
      role: string;
      admissionNumber: string;
    }

    this.formsubmitted = false;
    this.form = new FormGroup({
      "admissionNumber": new FormControl({value: parseData.admissionNumber,disabled: true},[Validators.required]),
      "emailId": new FormControl({value: parseData.email,disabled: true},[Validators.required]),
      "phoneNumber": new FormControl('',[Validators.required]),
      "dateApplied": new FormControl('',[Validators.required]),
      "subject": new FormControl('',[Validators.required]),
      "description": new FormControl('',[Validators.required]),
      "from": new FormControl('',[Validators.required]),
      "to": new FormControl('',[Validators.required]),
      "status": new FormControl(0,[Validators.required]),
    });
  }

  createApplicaiton(application){
    console.log(application);
    this.formsubmitted = true;
    if(!this.form.valid){
      return;
    }

    let applicationdata = {
      admissionNumber: this.form.get('admissionNumber').value,
      emailId: this.form.get('emailId').value,
      status: this.form.get('status').value,
      ...application
    }
    console.log(applicationdata);
    this.loadingCtrl.create({keyboardClose: true, message: 'Register Application...'})
    .then(loadingEl=>{
      loadingEl.present();

      this.userservice.applicationRegister(applicationdata)
      .then((res)=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['student','student-view-application']);
        this.formsubmitted = false;
        this.successMessage = "Application Registered successfully";
        this.showAlert('Success!',this.successMessage);
      },err=>{
        loadingEl.dismiss();
        this.errorMessage = err.message;
          this.showAlert('Error',this.errorMessage);
        this.formsubmitted = false;
      })
    })
    console.log('app',application);
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
