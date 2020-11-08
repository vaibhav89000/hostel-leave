import { Component, OnInit } from '@angular/core';
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
    private alert : AlertController) { }

  ngOnInit() {
    // this.userDetails = [
    //   {
    //     name: 'Russia',
    //     flag: 'f/f3/Flag_of_Russia.svg',
    //     area: 17075200,
    //     population: 146989754
    //   },
    //   {
    //     name: 'Canada',
    //     flag: 'c/cf/Flag_of_Canada.svg',
    //     area: 9976140,
    //     population: 36624199
    //   },
    //   {
    //     name: 'United States',
    //     flag: 'a/a4/Flag_of_the_United_States.svg',
    //     area: 9629091,
    //     population: 324459463
    //   },
    //   {
    //     name: 'China',
    //     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    //     area: 9596960,
    //     population: 1409517397
    //   }
    // ];
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

}
