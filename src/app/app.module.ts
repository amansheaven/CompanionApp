import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HTTP } from '@ionic-native/http/ngx'
import { Platform } from '@ionic/angular'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: (platform: Platform) => {
        return () => platform.ready()
      },
      deps: [Platform],
      multi: true
    },
    Geolocation,
    NFC,
    Ndef,
    Vibration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
