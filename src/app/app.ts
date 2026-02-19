import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./components/nav-menu/nav-menu";
import { navData } from "./models/navData";
import { ModalHostComponent } from "./components/modal-host/modal-host.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu, ModalHostComponent],
  template: `
  <router-outlet/>
  <app-nav-menu [navLinksArr]="navLinks"/>
  <app-modal-host />
  `,
})
export class App {
  protected title = 'sales-app';

  navLinks = navData;
}
