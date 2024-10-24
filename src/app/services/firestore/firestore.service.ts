import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Query, addDoc, collectionData, doc, docData, getDocs, updateDoc } from '@angular/fire/firestore';
import DiaryModel from 'src/app/models/DiaryModel';
import FirestoreTemplate from 'src/app/templates/FirestoreTemplate';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService extends FirestoreTemplate{

  constructor() {
    super();
  }

  async addDocument(reference: CollectionReference, data: any) {
    return await addDoc(reference, data);
  }

  async updateDocument(reference: DocumentReference, updateObj: any) {
    return await updateDoc(reference, updateObj);
  }

  getDocReference(path: string) {
    return doc(this.firestore, path);
  }

  async getDocuments(query: Query) {
    return await getDocs(query);
  }

  returnDocData(ref: DocumentReference) {
    return docData(ref);
  }

  returnCollectionData(query: Query) {
    return collectionData(query);
  }
}
