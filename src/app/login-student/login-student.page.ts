import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {AuthserviceService} from '../services/authservice.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.page.html',
  styleUrls: ['./login-student.page.scss'],
})
export class LoginStudentPage implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  constructor(private navCtrl: NavController,
    private authService: AuthserviceService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alert : AlertController) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
      });
    }
  
  
    validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'Please enter a valid email.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
    };
  
    loginUser(value) {
  
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => { 
          loadingEl.present();
  
        //   this.authService.loginadmin(value)
        // .then(res => {
        //   // console.log(res);
        //   console.log('I am logged in',res);
  
        //     this.errorMessage = "";
            
        //     loadingEl.dismiss();
        //     this.form.reset();
        //     this.showAlert('Success!','You are logged In');
        //     this.navCtrl.navigateForward('users');
            
  
        // }, err => {
        //   loadingEl.dismiss();
        //   this.errorMessage = err.message;
        //   this.showAlert('Error',this.errorMessage);
        //   console.log('err');
        // })
        this.authService.login(value,'Student').subscribe((res) =>{
          // console.log('res',res);
          // console.log('I am logged in',res);
  
            this.errorMessage = "";
            
            loadingEl.dismiss();
            this.form.reset();
            this.showAlert('Success!','You are logged In');
            this.navCtrl.navigateForward('/student/student-view-application');
        },(err)=>{
          loadingEl.dismiss();
          console.log('err',err);
          let error =err.error.error.errors;
          Object.keys(error).forEach(key=>{
  
          })
          error.forEach(element => {
            this.errorMessage = element['message'];
          this.showAlert('Error',this.errorMessage);
          });
  
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
  
  
  