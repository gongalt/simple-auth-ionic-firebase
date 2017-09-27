import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authServe: AuthServiceProvider,
    public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.events.subscribe('login', () => {
      this.isLoggedIn();
    });
    
    this.isLoggedIn();
  }

  async isLoggedIn() {
    const token = await this.authServe.getUserToken();
    if (token) {
      this.rootPage = 'HomePage';
    } else {
      this.rootPage = 'AuthPage';
    }
  }
}

