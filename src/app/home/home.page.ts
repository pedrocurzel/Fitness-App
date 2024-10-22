import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  async ngOnInit() {

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login", {
      replaceUrl: true
    });
  }
}
