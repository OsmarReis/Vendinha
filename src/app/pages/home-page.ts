import { Component, inject, signal } from '@angular/core';
import { MainWrapper } from '../components/main-wrapper/main-wrapper';
import { Wrapper } from '../components/wrapper/wrapper';
import { SearchAccountInput } from '../components/search-account-input/search-account-input';
import { SearchProductInput } from '../components/search-product-input/search-product-input';
import { AccountsStore } from '../store/accounts.store';
import { ProductsStore } from '../store/products.store';
import { ActionButton } from "../components/action-button/action-button.component";
import { AccountStoreSchema, ProductStoreSchema } from '../models/storeModels';
import { SendAccountSelected } from '../services/sendAccountSelected.service';
import { CartTotal } from '../components/cart-total/cart-total';

@Component({
  selector: 'app-home-page',
  imports: [MainWrapper, Wrapper, SearchAccountInput, SearchProductInput, ActionButton, CartTotal],
  template: `
    <app-main-wrapper>
      <app-wrapper>
          <app-search-account-input
            [hasTextLabel]="homePageTexts.accountInputLabel"
            [accountsData]="accountStore.accounts()"
            (isAccountSelected)="setAccount($event)"
          />
        
          <app-search-product-input/>
      </app-wrapper>

      <app-wrapper>
        <div class="w-full h-150"></div>
      </app-wrapper>

      <app-wrapper>
        <app-cart-total [accountData]="accountSelected()" [cartTotalInput]="cartTotal()" />
      </app-wrapper>
      <app-action-button>{{homePageTexts.actionBtn}}</app-action-button>
    </app-main-wrapper>
  `,
})
export class HomePage {

  protected accountStore = inject(AccountsStore)
  protected accountSelected = signal<AccountStoreSchema | null>(null)

  protected productStore = inject(ProductsStore)
  protected productSelected = signal<ProductStoreSchema | null>(null)

  protected cartTotal = signal(2000);
  
  protected homePageTexts = {
    actionBtn: "Finalizar compra",
    accountInputLabel: "Possui conta?",
  }
  
    setAccount(value: string) {
      SendAccountSelected(value, this.accountStore, this.accountSelected)
    }

    setProduct(){

    }

  
}
