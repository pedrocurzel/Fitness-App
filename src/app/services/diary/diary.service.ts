import { inject, Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, where, query, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import FirestoreTemplate from 'src/app/templates/FirestoreTemplate';
import { FirestoreService } from '../firestore/firestore.service';
import { getDay, getMonth, getYear } from 'src/app/helpers/date-helper';
import DiaryModel from 'src/app/models/DiaryModel';
import RecordModel from 'src/app/models/RecordModel';

@Injectable({
  providedIn: 'root'
})
export class DiaryService extends FirestoreTemplate {

  diaryReference = collection(this.firestore, "Diary");

  firestoreService = inject(FirestoreService);

  constructor() {
    super();
  }

  async getDiary(date: Date) {
    let UserId = this.auth.currentUser!.uid!;
    let q = query(this.diaryReference, where("UserId", "==", UserId),
                                       where("Day", "==", getDay(date)),
                                       where("Month", "==", getMonth(date)),
                                       where("Year", "==", getYear(date))
                 )
    
    let docs = await this.firestoreService.getDocuments(q);
   
    if (!docs.empty) {
      return this.firestoreService.returnDocData(docs.docs[0].ref);
    }

    let doc = await this.firestoreService.addDocument(this.diaryReference, {
      UserId,
      Date: date,
      Day: getDay(date),
      Month: getMonth(date),
      Year: getYear(date),
      Records: []
    });

    await this.firestoreService.updateDocument(doc, {
      Id: doc.id
    });

    return this.firestoreService.returnDocData(doc);
  }

  async addRecord(diary: DiaryModel, data: IFoodRecord) {
    delete data["search"];

    let docRef = this.firestoreService.getDocReference(`Diary/${diary.Id}`);
    let records = diary.Records ?? [];
    records.push(new RecordModel(data));
    diary.Records = records;
    return await this.firestoreService.updateDocument(docRef, JSON.parse(JSON.stringify(diary)));
  }

  async deleteRecord(diaryWithFilteredRecords: DiaryModel) {
    let docRef = this.firestoreService.getDocReference(`Diary/${diaryWithFilteredRecords.Id}`);

    return await this.firestoreService.updateDocument(docRef, JSON.parse(JSON.stringify(diaryWithFilteredRecords)));
  }

} 

export interface IFoodRecord {
  Calories: string,
  Fat: string,
  Proteins: string,
  Carbs: string,
  Weight: number,
  Meal: string | null,
  FoodId: string,
  DiaryId: string,
  FoodName: string,
  search?: string  //<- vai ser deletada sempre
}