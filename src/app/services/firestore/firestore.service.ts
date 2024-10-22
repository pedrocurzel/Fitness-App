import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Query, addDoc, docData, getDocs, updateDoc } from '@angular/fire/firestore';
import DiaryModel from 'src/app/models/DiaryModel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  async addDocument(reference: CollectionReference, data: any) {
    return await addDoc(reference, data);
  }

  async updateDocument(reference: DocumentReference, updateObj: any) {
    return await updateDoc(reference, updateObj);
  }

  async getDocuments(query: Query) {
    return await getDocs(query);
  }

  returnDocData(ref: DocumentReference) {
    return docData(ref);
  }
}
