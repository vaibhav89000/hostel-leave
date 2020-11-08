import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import 'firebase/database';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Injectable({
  providedIn: 'root' 
})
export class UsersService {

  constructor() { }

  registerUser(user){
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/').child(user.admissionNumber).set({
          ...user
        }).then(()=>{
          resolve();
        }).catch((err)=>{
          reject(err);
        });

    });
  }

  checkRegistered(admissionNumber){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users/'+admissionNumber);

      dbRef.once('value',(data)=>{
        console.log(data.val());
        if(data.val()!==null){
          reject({'message': 'User with this admission number already exist.'});
        }
        else{
          resolve();
        }
      })
    })
  }

  getUsers(){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users');
      dbRef.once('value',(data)=>{
        // console.log(data.val());
        if(data.val()===null){
          reject({'message': 'No User exist'});
        }
        else{
          resolve(data.val());
        }
      })
    })
  }
}
