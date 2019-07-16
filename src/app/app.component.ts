import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Live Chat ',
      url: '/chat',
      icon: 'mail-unread'
    },
    {
      title: 'Terms and conditions',
      url: '/terms',
      icon: 'logo-tumblr'
    },
    {
      title: 'About us',
      url: '/about',
      icon: 'help-circle-outline'
    },
    {
      title: 'schedule',
      url: '/schedule',
      icon: 'clock'
     },
     {
       title: 'register',
       url: '/register',
       icon: 'book'
     },
     {
      title: 'login',
      url: '/login',
      icon: 'book'
    },
    // {
    //   title: 'account-summary',
    //   url: '/account-summary',
    //   icon: 'eye'
    // },
    // {
    //   title: 'expenses-enterance',
    //   url: '/expenses-enterance',
    //   icon: 'eye'
    // },
    // {
    //   title: 'view-expenses',
    //   url: '/view-expenses',
    //   icon: 'eye'
    // },
    // {
    //   title: 'view-expenses',
    //   url: '/view-expenses',
    //   icon: 'eye'
    // },
    // {
    //   title: 'Default',
    //   url: '/default',
    //   icon: 'eye'
    // },


  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
