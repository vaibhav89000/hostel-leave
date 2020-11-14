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

  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  role: any;

  constructor(private http: HttpClient) { 
    
  }

  Rolecheck(expectedRole) {
    return this._user.asObservable().pipe(map(user => 
      {
        // console.log('user',user);
        if(user){
          if(user['role'] && user['role'] !== expectedRole){
            return false;
          }
          // console.log('user',user);
          return !!user.token;
        }
        else{
          return false;
        }
      }
      ));
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

  loginadmin(user,role){
    
    this.role = role;
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
       expirationTime,
       this.role)
      //  console.log('user',user);
        this._user.next(user);

             this.autoLogout(user.tokenDuration);

             this.storeAuthData(
               userData.localId,
                userData.idToken,
                 expirationTime.toISOString(),
                 userData.email,
                 this.role
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
          role: string
        }
        const expirationTime = new Date(parseData.tokenExpirationDate);
        if(expirationTime <= new Date()){
          return null;
        }
        const user = new User(
          parseData.userId,
          parseData.email,
          parseData.token,
          expirationTime,
          parseData.role
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
    email: string,
    role: string
  ){
    const data = JSON.stringify({
      userId: userId,
       token: token,
        tokenExpirationDate: tokenExpirationDate,
      email: email,
      role: role
    });
    Plugins.Storage.set({key : 'authData',value: data})
  };

  


}
