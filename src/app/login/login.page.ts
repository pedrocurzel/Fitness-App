import { Component, inject, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UserModel from '../models/UserModel';
import { AuthService } from '../services/auth/auth.service';
import RegisterModel from '../models/RegisterModel';
import { FirestoreService } from '../services/firestore/firestore.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  auth = inject(Auth);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);

  loadingCtrl = inject(LoadingController);

  form = this.formBuilder.group({
    Email: ["", [Validators.email, Validators.required]],
    Password: ["", Validators.required],
    Height: ["", [Validators.required]],
    CalorieTarget: ["", Validators.required],
    Name: ["", [Validators.required]],
    Weight: ["", Validators.required],
  });

  constructor() { }

  ngOnInit() {
  }

  async login() {
    if (this.form.controls.Email.valid && this.form.controls.Password.valid) {
      let loading = await this.createLoading();
      try {
        await this.authService.login(this.form.controls.Email.value!, this.form.controls.Password.value!);
        this.router.navigateByUrl("/home", {replaceUrl: true});
        return;
      } catch (e) {
        console.error("ERROR WHILE TRYING TO LOGIN");
        console.error(e);
        return;
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log("invalid");
    }
  }

  async register() {
    if (this.form.valid) {
      let loading = await this.createLoading();
      try {
        let registerModel = new RegisterModel(this.form.getRawValue());
        let userCred = await this.authService.register(registerModel)
        await this.firestoreService.createUser(userCred, registerModel);
        await this.login();
      } catch (e) {
        console.error("ERROR WHILE TRYING TO REGISTER");
        console.error(e);
        return;
      } finally {
        await loading.dismiss();
      }
    }
  }

  async createLoading() {
    let loading = await this.loadingCtrl.create({
      backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }

}
