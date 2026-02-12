import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page';
import { AccountPage } from './pages/account-page';
import { BalancePage } from './pages/balance-page';
import { ProductsPage } from './pages/products-page';
import { SettingsPage } from './pages/settings-page';

export const routes: Routes = [
  {path: "", component: HomePage},
  {path: "account", component: AccountPage},
  {path: "balance", component: BalancePage},
  {path: "products", component: ProductsPage},
  {path: "settings", component: SettingsPage}
];
