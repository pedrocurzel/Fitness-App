import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  router = inject(Router)

  showTabs = false;

  constructor() {
    //this.listenNavigation();
  }

  async listenNavigation() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url != "/login") {
        this.showTabs = true;
      } else if (event instanceof NavigationEnd && event.url == "/login") {
        this.showTabs = false;
      }
    })
  }
}
