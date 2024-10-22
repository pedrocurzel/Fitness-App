import { inject, Injectable } from '@angular/core';
import { user, UserCredential } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import RegisterModel from 'src/app/models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore = inject(Firestore);

  userCollectionRef = collection(this.firestore, "User");

  constructor() { }

  async createUser(userCred: UserCredential, registerModel: RegisterModel) {
    let userObj = {...registerModel, UserId: userCred.user.uid};
    delete userObj["Password"];

    return await addDoc(this.userCollectionRef, userObj);
  }
}
