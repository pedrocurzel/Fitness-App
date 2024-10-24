import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsComponent } from './components/tabs/tabs.component';

const firebaseConfig = {
  apiKey: "AIzaSyDMYsg-eUbH9D_wVVxFPlLS_M26uZuaqP4",
  authDomain: "fitness-app-e3d17.firebaseapp.com",
  projectId: "fitness-app-e3d17",
  storageBucket: "fitness-app-e3d17.appspot.com",
  messagingSenderId: "293799769481",
  appId: "1:293799769481:web:ccadab696ce81b8e3add58"
};

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
