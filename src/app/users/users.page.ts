import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import {UsersService} from '../services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  userDetails: any = [];
  message: any;

  constructor(private userservice: UsersService,
    private loadingCtrl: LoadingController,
    private alert : AlertController,
    private router: Router) { }

  ngOnInit() {
    console.log('users');
    // this.fetchUsers();
  }
  ionViewDidEnter (){
    console.log('check');
    this.fetchUsers();
  }

  fetchUsers(){
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Loading users details...' })
      .then(loadingEl => {
        loadingEl.present();

        this.userservice.getUsers().then((res)=>{
          let users = res;
          loadingEl.dismiss();
          this.userDetails = [];
          Object.keys(users).forEach(key => {
            // console.log(users[key]);
            this.userDetails.push(users[key]);
          });
    
        },(err)=>{
          loadingEl.dismiss();
          this.message = err.message;
          this.showAlert('Error',this.message);
          // console.log(err);
        });

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

  editUser(id){
    this.router.navigate(['admin','register',id]);
  }

}
