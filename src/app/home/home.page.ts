import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { DiaryService } from '../services/diary/diary.service';
import DiaryModel from '../models/DiaryModel';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  authService = inject(AuthService);
  diaryService = inject(DiaryService);
  router = inject(Router);

  user: User | null = null;

  diary: DiaryModel | null = null;
  ready = false;
  constructor() {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();
    await this.getDiary(new Date());
  }

  async getDiary(date: Date) {
    this.ready = false;
    this.handleSubscribe((await this.diaryService.getDiary(date)));
  }

  async navigateDiaries(direction: "forward" | "backward") {
    let date: Date = this.diary!.Date!.toDate();
    if (direction == "forward") {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() - 1);
    }
    await this.getDiary(date);
  }

  handleSubscribe(observable: Observable<DocumentData | undefined>) {
    observable
    .subscribe(val => {
      if (val) {
        this.diary = new DiaryModel(val);
        this.ready = true;
      }
    })
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login", {
      replaceUrl: true
    });
  }
}
