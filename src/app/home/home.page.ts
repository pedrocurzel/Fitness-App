import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { DiaryService } from '../services/diary/diary.service';
import DiaryModel from '../models/DiaryModel';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { getDay, getFullDate } from '../helpers/date-helper';
import { IonModal, ModalController } from '@ionic/angular';
import FoodModel from '../models/FoodModel';
import { FoodService } from '../services/food/food.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  authService = inject(AuthService);
  diaryService = inject(DiaryService);
  foodService = inject(FoodService);
  router = inject(Router);
  modalCtrl = inject(ModalController);

  changeDetector = inject(ChangeDetectorRef);

  user: User | null = null;

  diary: DiaryModel | null = null;
  ready = false;

  isAddFoodModalOpen = false;

  foods: FoodModel[] | null = null;

  foodModal = {
    search: ""
  }
  

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

  async addFood() {
    this.foodService.getFoods()
    .subscribe((value: FoodModel[]) => {
      this.foods = value;
    })
    this.isAddFoodModalOpen = true;
  }

  closeModal() {
    this.isAddFoodModalOpen = false;
  }

  filterFoods() {
    if (!this.foodModal.search) {
      return this.foods;
    }
    return this.foods?.filter(x => x.Name!.toLowerCase().includes(this.foodModal.search.toLowerCase()));
  }

  selectFood(food: FoodModel) {
    console.log(food);
    const swiperEl = document.querySelector('swiper-container')!;
    swiperEl.swiper.slideNext();
  }

  diaryDate() {
    return getFullDate(this.diary!.Date!.toDate());
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login", {
      replaceUrl: true
    });
  }
}
