import { inject, Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import RegisterModel from 'src/app/models/RegisterModel';
import { FirestoreService } from '../firestore/firestore.service';
import { collection } from '@angular/fire/firestore';
import FirestoreTemplate from 'src/app/templates/FirestoreTemplate';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirestoreTemplate {

  firestoreService = inject(FirestoreService);

  userCollectionRef = collection(this.firestore, "User");

  constructor() {
    super();
  }

  async createUser(userCred: UserCredential, registerModel: RegisterModel) {
    let userObj = {...registerModel, UserId: userCred.user.uid};
    delete userObj["Password"];

    return await this.firestoreService.addDocument(this.userCollectionRef, userObj);
  }
}
