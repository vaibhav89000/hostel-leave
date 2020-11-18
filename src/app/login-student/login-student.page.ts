import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {AuthserviceService} from '../services/authservice.service';
import { UsersService } from '../services/users.service';
import { Plugins } from '@capacitor/core';

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
    private UsersService: UsersService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alert : AlertController) { }

    ngOnInit() {
      this.form = this.formBuilder.group({
        admissionNumber: new FormControl('', Validators.compose([
          Validators.required,
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])),
      });
    }
  
  
    validation_messages = {
      'admissionNumber': [
        { type: 'required', message: 'admissionNumber is required.' },
        { type: 'pattern', message: 'Please enter a valid admissionNumber.' }
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 5 characters long.' }
      ]
    };
  
    loginUser(user) {
      
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => { 
          loadingEl.present();
        
        this.UsersService.emailGet(user.admissionNumber).then(res =>{
            // console.log('res',res);

            let User ={
              email: res['emailId'],
              password: this.form.get('password').value
            }
            // console.log('User',User);
            this.authService.login(User,'Student',user.admissionNumber).subscribe((res) =>{
              
              this.errorMessage = "";
              console.log('response',res);
              loadingEl.dismiss();
              this.form.reset();
              this.showAlert('Success!','You are logged In');
              this.navCtrl.navigateForward('/student/student-view-application');
          },(err)=>{
            loadingEl.dismiss();
            console.log('err',err);
            let error =err.error.error.errors;
            error.forEach(element => {
              this.errorMessage = element['message'];
            this.showAlert('Error',this.errorMessage);
            });
    
          })
        },err=>{
          loadingEl.dismiss();
          console.log('err',err);
          this.showAlert('Failed!',err.message);
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
  
  
  