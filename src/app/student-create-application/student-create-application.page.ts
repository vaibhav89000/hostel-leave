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
  id: any;
  parseData: any;
  existingApplication: any;

  constructor(private loadingCtrl: LoadingController,
    private alert : AlertController,
    private userservice: UsersService,
    private navCtrl: NavController,
    private router:Router,
    private route:ActivatedRoute) { 

      this.existingApplication = false;

    }

  ngOnInit() {
    this.existingApplication = false;
    // To get todays date
    let currentTime = new Date();

    // let currentOffset = currentTime.getTimezoneOffset();

    // let ISTOffset = 330;   // IST offset UTC +5:30 

    // let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    // let yyyy = ISTTime.getFullYear();
    // let mm = ISTTime.getMonth()+1;
    // let dd = ISTTime.getDate();
    // this.currentDate = yyyy+'-'+mm+'-'+dd;
    // console.log('this.currentDate',this.currentDate);

    this.currentDate=this.formatDate(currentTime);
    console.log('this.currentDate',this.currentDate);
  // code for format date
  
    
    let storedData = Plugins.Storage.get({key: 'authData'})['__zone_symbol__value']
    this.parseData = JSON.parse(storedData.value) as {
      userId: string;
      token: string;
      tokenExpirationDate: string;
      email: string;
      role: string;
      admissionNumber: string;
    }

    this.formsubmitted = false;
    this.form = new FormGroup({
      "admissionNumber": new FormControl({value: this.parseData.admissionNumber,disabled: true},[Validators.required]),
      "emailId": new FormControl({value: this.parseData.email,disabled: true},[Validators.required]),
      "phoneNumber": new FormControl({value: '',disabled: false},[Validators.required]),
      "dateApplied": new FormControl({value: '',disabled: false},[Validators.required]),
      "subject": new FormControl({value: '',disabled: false},[Validators.required]),
      "description": new FormControl({value: '',disabled: false},[Validators.required]),
      "from": new FormControl({value: '',disabled: false},[Validators.required]),
      "to": new FormControl({value: '',disabled: false},[Validators.required]),
      "status": new FormControl(0,[Validators.required])
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      //console.log('read param');
      if (this.id !== undefined) {
        this.userservice.getStudentAppliaction(this.id).then((User) => {
          this.existingApplication = true;
          this.formset(User);
        }, (err) => {
          //console.log(err);
          this.router.navigate(['student','student-create-application']);
        });
      }else{
        this.router.navigate(['student','student-create-application']);
      }
    });
  }

  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

  formset(User) {
    //console.log(User);
    // this.form = new FormGroup({
    //   "admissionNumber": new FormControl({value: this.parseData.admissionNumber,disabled: true},[Validators.required]),
    //   "emailId": new FormControl({value: this.parseData.email,disabled: true},[Validators.required]),
    //   "phoneNumber": new FormControl(User.phoneNumber,[Validators.required]),
    //   "dateApplied": new FormControl(User.dateApplied,[Validators.required]),
    //   "subject": new FormControl(User.subject,[Validators.required]),
    //   "description": new FormControl(User.description,[Validators.required]),
    //   "from": new FormControl(User.from,[Validators.required]),
    //   "to": new FormControl(User.to,[Validators.required]),
    //   "status": new FormControl(User.status,[Validators.required]),
    // });

    this.form.patchValue({
      admissionNumber: this.parseData.admissionNumber,
      emailId: this.parseData.email,
      phoneNumber: User.phoneNumber,
      dateApplied: User.dateApplied,
      subject: User.subject,
      description: User.description,
      from: User.from,
      to: User.to,
      status: User.status
     });
    if(User.status !== 0){
      //console.log('hold',User.status);
      this.form.controls['phoneNumber'].disable();
      this.form.controls['dateApplied'].disable();
      this.form.controls['subject'].disable();
      this.form.controls['description'].disable();
      this.form.controls['from'].disable();
      this.form.controls['to'].disable();
      this.form.controls['status'].disable();
    }
    else{
      this.form.controls['dateApplied'].disable();
    }

    
    
  }

  createApplicaiton(application){
    //console.log(application);
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
    // //console.log(applicationdata);
    if(this.existingApplication){
      this.loadingCtrl.create({keyboardClose: true, message: 'Update Application...'})
    .then(loadingEl=>{
      loadingEl.present();

      this.userservice.updateApplication(applicationdata,this.id)
      .then((res)=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['student','student-view-application']);
        this.formsubmitted = false;
        this.successMessage = "Application Updated successfully";
        this.showAlert('Success!',this.successMessage);
      },err=>{
        loadingEl.dismiss();
        this.errorMessage = err.message;
          this.showAlert('Error',this.errorMessage);
        this.formsubmitted = false;
      })
    })
    }
    else{
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
    }
    
    // //console.log('app',application);
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
