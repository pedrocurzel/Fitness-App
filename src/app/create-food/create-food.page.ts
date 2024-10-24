import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodService } from '../services/food/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.page.html',
  styleUrls: ['./create-food.page.scss'],
})
export class CreateFoodPage implements OnInit {

  formBuilder = inject(FormBuilder);
  foodService = inject(FoodService);
  router = inject(Router);

  form = this.formBuilder.group({
    Name: ["", Validators.required],
    Calories: ["", Validators.required],
    Proteins: ["", Validators.required],
    Carbs: ["", Validators.required],
    Fat: ["", Validators.required],
  })

  constructor() { }

  ngOnInit() {
  }

  async criarAlimento() {
    if (this.form.valid) {
      let res = await this.foodService.createFood(this.form.getRawValue());
      await this.router.navigateByUrl("/home", {replaceUrl: true});
    }
  }

}
