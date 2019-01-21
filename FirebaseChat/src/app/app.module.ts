import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { SignupPage } from '../pages/signup/signup';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyAHp8CmnWj1s77rv8Sj8Mf9i9iyr-Np-4U",
    authDomain: "ionic-chat-48249.firebaseapp.com",
    databaseURL: "https://ionic-chat-48249.firebaseio.com",
    storageBucket: "ionic-chat-48249.appspot.com",
    messagingSenderId: "698723906053"
} 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
