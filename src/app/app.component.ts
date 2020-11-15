import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import {Plugins, Capacitor} from '@capacitor/core';
import {AuthserviceService} from '../app/services/authservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  
  private authSub: Subscription;
  private previousAuthState = false;
  private roleSub: Subscription;

  role: any;

  constructor(
    private platform: Platform,
    
    private authService: AuthserviceService,
    private router:Router,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit(){
    this.authService.roleMenu.subscribe(role => {
      console.log('role',role);
      this.role = role;
    })

    this.authSub = this.authService.userISAuthenticated.subscribe(isAuth => {
      
      if(!isAuth && this.previousAuthState !== isAuth){
        this.router.navigate(["admin/login-admin"]);
      }
      this.previousAuthState = isAuth;
    })
  }

  logout(){
    console.log('logged out');
    this.authService.logOut();
  }
  

  ngOnDestroy(){
    if(this.authSub){
      this.authSub.unsubscribe();
    }
    if(this.roleSub){
      this.roleSub.unsubscribe();
    }
  }
}
