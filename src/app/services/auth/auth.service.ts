import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import RegisterModel from 'src/app/models/RegisterModel';
import UserModel from 'src/app/models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private auth = inject(Auth);

  constructor() { }

  async register(registerModel: RegisterModel) {
    return await createUserWithEmailAndPassword(this.auth, registerModel.Email!, registerModel.Password!);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await signOut(this.auth);
  }

}
