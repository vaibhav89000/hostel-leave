import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {AuthserviceService} from '../services/authservice.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthserviceService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private userservice: UsersService,
    private loadingCtrl: LoadingController,
    private alert : AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }


  resetPassword(form){
    this.loadingCtrl.create({keyboardClose: true, message: 'Sending Mail'})
    .then(loadingEl =>{
      loadingEl.present();

      this.authService.resetPassword(form.email).then(res=>{

        this.form.reset();
        loadingEl.dismiss();
        this.showAlert('Success','Check your email id');
      },err=>{
        this.showAlert('Error',err.message);
        loadingEl.dismiss();
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
