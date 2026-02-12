import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./components/nav-menu/nav-menu";

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

  navLinks = [
  {svgIcon: "account_circle", urlPath: "account", name: "Contas"},
  {svgIcon: "insert_chart_outlined", urlPath: "balance", name: "Balanço"},
  {svgIcon: "add_shopping_cart", urlPath: "", name: "Caixa(Início)"},
  {svgIcon: "dashboard", urlPath: "products", name: "Estoque"},
  {svgIcon: "settings", urlPath: "settings", name: "Configurações"}
  ];
}
