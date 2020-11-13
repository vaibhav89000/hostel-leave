import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, from } from "rxjs";
import {map, tap} from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import {HttpClient} from '@angular/common/http';
import {User} from '../services/user.model';
import { Plugins } from '@capacitor/core';
import {environment} from '../../environments/environment';
interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements OnDestroy{

  // public userSubject: BehaviorSubject<boolean>;
  // public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  constructor(private http: HttpClient) { 
    // this.userSubject = new BehaviorSubject<boolean>(null);
  }

  get userISAuthenticated() {
    return this._user.asObservable().pipe(map(user => 
      {
        if(user){
          return !!user.token;
        }
        else{
          return false;
        }
      }
      ));
  }

  get userId() {
    return this._user.asObservable().pipe(map(user =>{
      if(user){
        return user.id;
      }
      else{
        return null;
      }
    } ));
  }

  loginadmin(user){
    
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }).pipe(tap(this.setUserData.bind(this)));
  }

  logOut(){
    // this.userSubject.next(false);
    if(this.activeLogoutTimer){
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'})
  }

  ngOnDestroy(){
    if(this.activeLogoutTimer){
      clearTimeout(this.activeLogoutTimer);
    }
  }

  private autoLogout(duration: number){
    if(this.activeLogoutTimer){
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(()=>{
      this.logOut();
  },duration);
  }

  private setUserData(userData: AuthResponseData){
    const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
    const user = new User(
      userData.localId, 
      userData.email,
       userData.idToken,
       expirationTime)
        this._user.next(user);

             this.autoLogout(user.tokenDuration);

             this.storeAuthData(
               userData.localId,
                userData.idToken,
                 expirationTime.toISOString(),
                 userData.email
             );
  }


  autoLogin() {
    return from (Plugins.Storage.get({key: 'authData'})).pipe(
      map(storedData=>{
        if(!storedData || !storedData.value){
          return null;
        }
        const parseData = JSON.parse(storedData.value) as {
          userId: string;
          token: string;
          tokenExpirationDate: string;
          email: string;
        }
        const expirationTime = new Date(parseData.tokenExpirationDate);
        if(expirationTime <= new Date()){
          return null;
        }
        const user = new User(
          parseData.userId,
          parseData.email,
          parseData.token,
          expirationTime
          );
          return user;
      }),
      tap(user => {
        if(user){
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user =>{
        return !!user;
      })
      );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ){
    const data = JSON.stringify({
      userId: userId,
       token: token,
        tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({key : 'authData',value: data})
  };

  


}
