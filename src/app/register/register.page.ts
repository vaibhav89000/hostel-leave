import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { callInstance } from '@ionic-native/core/decorators/common';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
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
  id: any;

  constructor(private loadingCtrl: LoadingController,
    private alert: AlertController,
    private userservice: UsersService,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute) {
    this.formsubmitted = false;
  }

  ngOnInit() {
    console.log('register');
    this.formsubmitted = false;

    this.form = new FormGroup({
      "fullName": new FormControl('', [Validators.required]),
      "admissionNumber": new FormControl('', [Validators.required]),
      "year": new FormControl('', [Validators.required]),
      "gender": new FormControl('', [Validators.required]),
      "hostel": new FormControl('', [Validators.required]),
      "roomNumber": new FormControl('', [Validators.required]),
      "emailId": new FormControl('', [Validators.required]),
      "phoneNumber": new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.userservice.userExist(this.id).then((User) => {

          this.formset(User);
        }, (err) => {
          console.log(err);
          this.router.navigate(['admin','register']);
        });
      }else{
        this.router.navigate(['admin','register']);
      }
    });


  }

  formset(User) {
    this.form = new FormGroup({
      "fullName": new FormControl(User.fullName, [Validators.required]),
      "admissionNumber": new FormControl(User.admissionNumber, [Validators.required]),
      "year": new FormControl(User.year, [Validators.required]),
      "gender": new FormControl(User.gender, [Validators.required]),
      "hostel": new FormControl(User.hostel, [Validators.required]),
      "roomNumber": new FormControl(User.roomNumber, [Validators.required]),
      "emailId": new FormControl(User.emailId, [Validators.required]),
      "phoneNumber": new FormControl(User.phoneNumber, [Validators.required]),
    });
  }


  register(value) {

    this.formsubmitted = true;
    if (!this.form.valid) {
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

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Updating user...' })
      .then(loadingEl => {
        loadingEl.present();

        if (this.id) {
          // this.userservice.signUp(formdata.emailId, formdata.admissionNumber).then(res => {
            this.userservice.editUser(formdata)
              .then(res => {
                loadingEl.dismiss();
                console.log(res);
                this.form.reset();
                this.errorMessage = "";
                this.successMessage = "User details edited successfully";
                this.showAlert('Success!', this.successMessage);
                this.formsubmitted = false;


              }, err => {
                loadingEl.dismiss();
                console.log(err);
                this.errorMessage = err.message;
                this.showAlert('Error', this.errorMessage);
                this.successMessage = "";
              })
          // }, err => {
          //   loadingEl.dismiss();
          //   console.log(err);
          //   console.log('email id is already used');
          //   this.errorMessage = err.message;
          //   this.showAlert('Error', this.errorMessage);
          //   this.successMessage = "";
          // });

        }
        else {
          this.userservice.checkRegistered(formdata.admissionNumber)
            .then((res) => {

              this.userservice.signUp(formdata.emailId, formdata.admissionNumber).then(res => {
                this.userservice.registerUser(formdata)
                  .then(res => {
                    loadingEl.dismiss();
                    console.log(res);
                    this.form.reset();
                    this.errorMessage = "";
                    this.successMessage = "User Registered successfully";
                    this.showAlert('Success!', this.successMessage);
                    this.formsubmitted = false

                  }, err => {
                    loadingEl.dismiss();
                    console.log(err);
                    this.errorMessage = err.message;
                    this.showAlert('Error', this.errorMessage);
                    this.successMessage = "";
                  })
              }, err => {
                console.log(err);
                loadingEl.dismiss();
                this.errorMessage = err.message;
                this.showAlert('Error', this.errorMessage);
              })
            }, (err) => {
              loadingEl.dismiss();
              this.errorMessage = err.message;
              this.showAlert('Error', this.errorMessage);
              this.successMessage = "";
              console.log('err', err);
            })
        }

      });
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
