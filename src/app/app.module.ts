import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/ble';

import { MyApp } from './app.component';
import { RunComponent } from './run/run.component';
import { ProgressTimeComponent } from './run/progress-time.component';
import { CircularMenuComponent } from './circular-menu/ts/circular-menu.component';
import { PinComponent } from './pin/ts/pin.component';
import { CardMapComponent } from './card-map/ts/card-map.component';
import { CircularTableComponent } from './circular-table/ts/circular-table.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { UserPage } from '../pages/user/user';
import { AdminPage } from '../pages/admin/admin';
import { VotePage } from '../pages/vote/vote';
import { ResultatPage } from '../pages/resultat/resultat';
import { SessionCreateModalPage } from '../pages/SessionCreateModalPage/SessionCreateModalPage';

@NgModule({
  declarations: [
    MyApp,
    RunComponent,
    ProgressTimeComponent,
    PinComponent,
    CircularMenuComponent,
    CircularTableComponent,
    CardMapComponent,
    HomePage,
    UserPage,
    AdminPage,
    ProfilePage,
    VotePage,
    ResultatPage,
    SessionCreateModalPage
  ],
  imports: [
    DragulaModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdminPage,
    ProfilePage,
    VotePage,
    UserPage,
    ResultatPage,
    SessionCreateModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
