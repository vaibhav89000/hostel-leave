import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {AuthserviceService} from '../services/authservice.service';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {

  form: FormGroup;
  errorMessage: string = '';
  constructor(
    private authService: AuthserviceService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private userservice: UsersService,
    private loadingCtrl: LoadingController,
    private alert : AlertController,
    private router: Router) { }

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

      
      this.authService.login(value,'Admin','admin').subscribe((res) =>{
          this.errorMessage = "";
          console.log(res);
          this.userservice.adminEmailCheck(res.localId).then(res=>{

          loadingEl.dismiss();
          this.form.reset();
          this.showAlert('Success!','You are logged In');
          this.router.navigate(['/admin/users']);
          // this.navCtrl.navigateForward('/admin/users');
          },err=>{
            loadingEl.dismiss();
            this.showAlert('Failed!',err.message);
          })

          
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


