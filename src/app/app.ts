import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./components/nav-menu/nav-menu";
import { navData } from "./models/navData";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu],
  template: `
  <router-outlet/>
  <app-nav-menu [navLinksArr]="navLinks"/>
  `,
})
export class App {
  protected title = 'sales-app';

  navLinks = navData;
}
