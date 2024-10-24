import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { DiaryService, IFoodRecord } from '../services/diary/diary.service';
import DiaryModel from '../models/DiaryModel';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { getDay, getFullDate } from '../helpers/date-helper';
import { IonModal, ModalController } from '@ionic/angular';
import FoodModel from '../models/FoodModel';
import { FoodService } from '../services/food/food.service';
import { SwiperOptions } from 'swiper/types';

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

  selectedFood : FoodModel | null = null;

  foodModal = {
    search: "",
    Calories: "",
    Fat: "",
    Proteins: "",
    Carbs: "",
    Weight: 100,
    Meal: null
  }
  

  constructor() {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();
    await this.getDiary(new Date());
  }

  startSwiper() {
    const swiperEl = document.querySelector('swiper-container')!;

    // swiper parameters
    const swiperParams: SwiperOptions = {
      slidesPerView: 1,
      //allowSlideNext: false,
      //allowSlidePrev: false,
      allowTouchMove: false,
      on: {
        init() {
          // ...
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
  }

  backSlide() {
    const swiperEl = document.querySelector('swiper-container')!;
    swiperEl.swiper.slidePrev();
    this.resetFoodModal();
  }

  resetFoodModal() {
    this.foodModal.Weight = 100;
    this.selectedFood = null;
    this.foodModal.Meal = null;
  }

  async getDiary(date: Date) {
    this.ready = false;
    this.handleSubscribe((await this.diaryService.getDiary(date)));
  }

  async addDiaryRecord() {
    let infoCopy = JSON.parse(JSON.stringify(this.foodModal)) as IFoodRecord;
    infoCopy["FoodId"] = this.selectedFood?.Id!;
    infoCopy["DiaryId"] = this.diary?.Id!;
    infoCopy["FoodName"] = this.selectedFood?.Name!;
    
    await this.diaryService.addRecord(this.diary!, infoCopy);

    this.isAddFoodModalOpen = false;
    this.resetFoodModal();
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
      this.ready = false;
      if (val) {
        this.diary = new DiaryModel(val); 
      }
      this.ready = true;
    })
  }

  async addFood() {
    this.foodService.getFoods()
    .subscribe((value: FoodModel[]) => {
      this.foods = value;
    })
    this.isAddFoodModalOpen = true;
    setTimeout(() => {
      this.startSwiper();
    }, 100);
  }

  closeModal() {
    this.isAddFoodModalOpen = false;
  }

  filterRecords(meal: Meal) {
    return this.diary?.Records.filter(x => x.Meal == meal)!;
  }

  filterFoods() {
    if (!this.foodModal.search) {
      return this.foods;
    }
    return this.foods?.filter(x => x.Name!.toLowerCase().includes(this.foodModal.search.toLowerCase()));
  }

  selectFood(food: FoodModel) {
    this.selectedFood = food;
    this.foodModal.Calories = food.Calories!;
    this.foodModal.Fat = food.Fat!;
    this.foodModal.Carbs = food.Carbs!;
    this.foodModal.Proteins = food.Proteins!;

    const swiperEl = document.querySelector('swiper-container')!;
    swiperEl.swiper.slideNext();
  }

  diaryDate() {
    return getFullDate(this.diary!.Date!.toDate());
  }

  weightChanged() {
    this.foodModal.Calories = ((this.foodModal.Weight * parseFloat(this.selectedFood!.Calories!)) / 100.0).toFixed(0);
    this.foodModal.Fat      = ((this.foodModal.Weight * parseFloat(this.selectedFood!.Fat!)) / 100.0).toFixed(1);
    this.foodModal.Carbs    = ((this.foodModal.Weight * parseFloat(this.selectedFood!.Carbs!)) / 100.0).toFixed(1);
    this.foodModal.Proteins = ((this.foodModal.Weight * parseFloat(this.selectedFood!.Proteins!)) / 100.0).toFixed(1);
  }

  getDiaryTotalizer() {
    let result = this.diary?.Records.reduce((acc, curr) => {
      acc.Calories += curr.Calories;
      acc.Carbs += curr.Carbs;
      acc.Proteins += curr.Proteins;
      acc.Fat += curr.Fat;

      return acc;
    }, {
      Calories: 0,
      Fat: 0,
      Proteins: 0,
      Carbs: 0
    })!;

    return `${result.Calories} cal - Proteínas ${result.Proteins}g - Carboidratos ${result.Carbs}g - Gorduras ${result.Fat}g`;
  }

  getMealTotalizers(meal: Meal) {
    let result = this.diary?.Records.filter(x => x.Meal == meal)!.reduce((acumulator, currentValue) => {
      acumulator.Calories += currentValue.Calories;
      acumulator.Proteins += currentValue.Proteins;
      acumulator.Fat += currentValue.Fat;
      acumulator.Carbs += currentValue.Carbs;

      return acumulator;
    }, {
      Calories: 0,
      Proteins: 0,
      Fat: 0,
      Carbs: 0
    })!;

    return `${result.Calories} cal - Proteínas ${result.Proteins}g - Carboidratos ${result.Carbs}g - Gorduras ${result.Fat}g`;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("/login", {
      replaceUrl: true
    });
  }
}

enum Meal {
  BreakFast = 1,
  Lunch = 2,
  Snacks = 3,
  Dinner = 4
}