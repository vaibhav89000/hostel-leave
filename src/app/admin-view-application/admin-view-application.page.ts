import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { Plugins } from '@capacitor/core';
import { StatusChangeComponent } from '../status-change/status-change.component';

@Component({
  selector: 'app-admin-view-application',
  templateUrl: './admin-view-application.page.html',
  styleUrls: ['./admin-view-application.page.scss'],
})
export class AdminViewApplicationPage implements OnInit {

  userData: any;
  userApplication: any = [];
  userApplication_asResponse: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private userservice: UsersService,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    let storedData = Plugins.Storage.get({ key: 'authData' })['__zone_symbol__value']
    this.userData = JSON.parse(storedData.value) as {
      userId: string;
      token: string;
      tokenExpirationDate: string;
      email: string;
      role: string;
      admissionNumber: string;
    }

  }

  viewApplication(id) {
    
    let Userapplication = {};

    Object.keys(this.userApplication_asResponse).forEach(key => {
      if (key === id) {
        Userapplication = {...this.userApplication_asResponse[key]};
        Userapplication['dateApplied'] = this.getTime(Userapplication['dateApplied']);
        Userapplication['from'] = this.getTime(Userapplication['from']);
        Userapplication['to'] = this.getTime(Userapplication['to']);

      }
    })

    this.modalCtrl.create({
      component: StatusChangeComponent,
      componentProps: { selectedApplication: Userapplication }
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultdata => {

        if (resultdata.role === 'confirm') {
          this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Applications' })
            .then(loadinEl => {
              loadinEl.present();
              this.userApplication_asResponse[id]['status'] = resultdata.data['status'];
              let status_label: any;
              if (resultdata.data['status'] === 0) {
                status_label = 'Hold';
              }
              if (resultdata.data['status'] === 1) {
                status_label = 'Approved';
              }
              if (resultdata.data['status'] === 0) {
                status_label = 'Declined';
              }

              this.userservice.statusChange(id, this.userApplication_asResponse[id])
                .then(res => {
                  loadinEl.dismiss();
                  this.showAlert('Success', `Application status is changed to: ${status_label}`);
                }, err => {
                  loadinEl.dismiss();
                  this.showAlert('Failed', `To change status to: ${status_label}` + 'because of' + err);
                })
            })

        }
        this.userApplication = [];
        this.fetchApplication();

      })
  }

  ionViewDidEnter() {
    this.userApplication = [];
    this.userApplication_asResponse = [];
    let storedData = Plugins.Storage.get({ key: 'authData' })['__zone_symbol__value']
    this.userData = JSON.parse(storedData.value) as {
      userId: string;
      token: string;
      tokenExpirationDate: string;
      email: string;
      role: string;
      admissionNumber: string;
    }

    this.fetchApplication();
  }


  fetchApplication() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Applications' })
      .then(loadingEl => {
        loadingEl.present();

        this.userservice.getStudentAppliactions().then((res) => {
          const applications = res;
          this.userApplication_asResponse = applications;
          Object.keys(applications).forEach(key => {
            if (new Date(applications[key].from) >= new Date()) {
              let status_of_application;
              if (applications[key].status === 0) {
                status_of_application = 'Hold';
              }
              else if (applications[key].status === 1) {
                status_of_application = 'Approved';
              }
              else {
                status_of_application = 'Declined';
              }
              let application_obj = {
                dateApplied: this.getTime(applications[key].dateApplied),
                subject: applications[key].subject,
                from: this.getTime(applications[key].from),
                to: this.getTime(applications[key].to),
                status: status_of_application,
                ref: key
              }
              this.userApplication.push(application_obj);
            }
          })
          loadingEl.dismiss();
        }, err => {
          loadingEl.dismiss();
        })
      })
  }

  getTime(date) {
    // console.log(date);
    date = new Date(date);
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    let gen_date = dd + '-' + mm + '-' + yyyy;
    return gen_date;
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
