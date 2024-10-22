import { inject } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";

export default class FirestoreTemplate {
    firestore = inject(Firestore);
    auth = inject(Auth);
}