import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {UsersService} from '../services/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  errorMessage: any;
  successMessage: any;
  formsubmitted: any;

  constructor(private loadingCtrl: LoadingController,
    private alert : AlertController,
    private userservice: UsersService,
    private navCtrl: NavController) { 
      this.formsubmitted = false;
    }

  ngOnInit() {
    this.formsubmitted = false;

    this.form = new FormGroup({
      "firstName": new FormControl('',[Validators.required]),
      "middleName": new FormControl(''),
      "lastName": new FormControl(''),
      "admissionNumber": new FormControl('',[Validators.required]),
      "year": new FormControl('',[Validators.required]),
      "gender": new FormControl('',[Validators.required]),
      "hostel": new FormControl('',[Validators.required]),
      "roomNumber": new FormControl('',[Validators.required]),
    });
  }

  register(value){

    this.formsubmitted = true;
    if(!this.form.valid){
      return;
    }

    let formdata = {
      firstName: this.form.get('firstName').value.toLowerCase(),
      middleName: this.form.get('middleName').value.toLowerCase(),
      lastName: this.form.get('lastName').value.toLowerCase(),
      admissionNumber: this.form.get('admissionNumber').value.toLowerCase(),
      year: this.form.get('year').value,
      gender: this.form.get('gender').value,
      hostel: this.form.get('hostel').value,
      roomNumber: this.form.get('roomNumber').value
    };

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Creating new user...' })
      .then(loadingEl => {
        loadingEl.present();

      this.userservice.checkRegistered(formdata.admissionNumber)
      .then((res)=>{

        this.userservice.registerUser(formdata)
        .then(res => {
          loadingEl.dismiss();
          console.log(res);
          this.form.reset();
          this.errorMessage = "";
          this.successMessage = "User Registered successfully";
          this.showAlert('Success!',this.successMessage);
          this.formsubmitted = false
          // this.navCtrl.navigateForward('login');
        }, err => {
          loadingEl.dismiss();
          console.log(err);
          this.errorMessage = err.message;
          this.showAlert('Error',this.errorMessage);
          this.successMessage = "";
        })

      },(err)=>{
        loadingEl.dismiss();
        this.errorMessage = err.message;
          this.showAlert('Error',this.errorMessage);
          this.successMessage = "";
        console.log('err',err);
      })
        });
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
