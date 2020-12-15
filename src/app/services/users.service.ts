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
        }).then((res)=>{
          resolve(res);
        }).catch((err)=>{
          reject(err);
        });

    });
  }

  checkRegistered(admissionNumber){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users/'+admissionNumber);

      dbRef.once('value',(data)=>{
        if(data.val()!==null){
          reject({'message': 'User with this admission number already exist.'});
        }
        else{
          resolve(data.val());
        }
      })
    })
  }

  getUsers(){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users');
      dbRef.once('value',(data)=>{
        // //console.log(data.val());
        if(data.val()===null){
          reject({'message': 'No User exist'});
        }
        else{
          resolve(data.val());
        }
      })
    })
  }

  userExist(admissionNumber){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users/'+admissionNumber);

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'User with this admission number already exist.'});
        }
        else{
          resolve(data.val());
        }
      })
    })
  }

  editUser(user){
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/').child(user.admissionNumber).set({
        ...user
      }).then((res)=>{
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });

  });
  }

  getProfile(admissionNumber){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users/'+admissionNumber);

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'User with this admission number already exist.'});
        }
        else{
          resolve(data.val());
        }
      })
    })
  }

  signUp(emailId,password){
    return new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(res =>{
        resolve(res);
      },err=>{
        reject(err);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  emailGet(admissionNumber){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/users/'+admissionNumber);

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'User does not exist already exist.'});
        }
        else{
          // //console.log(data.val());
          resolve(data.val());
        }
      })

    })
  }


  adminEmailCheck(localId){
    return new Promise((resolve,reject)=>{
      const dbRef = firebase.database().ref('/admins/'+localId);

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'User does not exist.'});
        }
        else{
          //console.log(data.val());
          resolve(data.val());
        }
      })

    })
  }


  applicationRegister(application){
    return new Promise((resolve, reject) => {
      firebase.database().ref('application/').push({
        ...application
      }).then((res)=>{
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });

  });
  }


  getStudentAppliactions(){
    return new Promise((resolve, reject) => {
      const dbRef = firebase.database().ref('/application');

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'No application found create one.'});
        }
        else{
          //console.log(data.val());
          resolve(data.val());
        }
      })

    })
  }

  getStudentAppliaction(id){
    return new Promise((resolve, reject) => {
      const dbRef = firebase.database().ref('/application/'+id);

      dbRef.once('value',(data)=>{
        if(data.val()===null){
          reject({'message': 'No application found create one.'});
        }
        else{
          //console.log(data.val());
          resolve(data.val());
        }
      })

    })
  }


  updateApplication(application,id){
    return new Promise((resolve, reject) => {
      firebase.database().ref('application/').child(id).set({
        ...application
      }).then((res)=>{
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });

  });
  }

  statusChange(id,application){
    return new Promise((resolve,reject) => {
      firebase.database().ref('application/').child(id).set({
        ...application
      }).then((res)=>{
        resolve(res);
      }).catch((err)=>{
        reject(err);
      });
    })
  }



}
