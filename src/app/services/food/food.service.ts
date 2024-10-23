import { inject, Injectable } from '@angular/core';
import { collection, query } from '@angular/fire/firestore';
import FirestoreTemplate from 'src/app/templates/FirestoreTemplate';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService extends FirestoreTemplate {

  foodReference = collection(this.firestore, "Food");

  firestoreService = inject(FirestoreService);

  constructor() {
    super();
  }

  getFoods() {
    let q = query(this.foodReference);
    return this.firestoreService.returnCollectionData(q);
  }
}
