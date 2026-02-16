import { Component, inject, signal } from '@angular/core';
import { MainWrapper } from '../components/main-wrapper/main-wrapper';
import { Wrapper } from '../components/wrapper/wrapper';
import { SearchAccountInput } from '../components/search-account-input/search-account-input';
import { SearchProductInput } from '../components/search-product-input/search-product-input';
import { AccountsStore } from '../store/accounts.store';
import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-home-page',
  imports: [MainWrapper, Wrapper, SearchAccountInput, SearchProductInput],
  template: `
    <app-main-wrapper>
      <app-wrapper>
          <app-search-account-input
            [hasTextLabel]="labelText"
            [accountsData]="accountStore.accounts()"
          />
        
          <app-search-product-input/>
      </app-wrapper>

      <app-wrapper>
        <div class="w-full h-120"></div>
      </app-wrapper>

      <app-wrapper>
        <div class="w-full flex items-end">
          @if (accountSelected() !== '') {
            <div class="w-full">
              <p class="text-xs">
                Saldo da conta
                <span class="bg-[#F5F5F5] py-0.5 px-1"
                  >{{ accountSelected() }} - {{ accountName() }}</span
                >:
                <span>R$ {{ accountAmount().toFixed(2).toString() }}</span>
              </p>
              <p class="text-xs">
                Saldo após compra: R$
                {{ amountAfterPurchase().toFixed(2).toString() }}
              </p>
            </div>
          }

          <p class="w-full pt-1.5 text-right text-xl font-semibold">
            Total: R$ {{ totalExpenses().toFixed(2).toString() }}
          </p>
        </div>
      </app-wrapper>

      <button class="w-full border border-orange-400 bg-orange-400 cursor-pointer text-white text-xl font-semibold uppercase py-4 rounded-md drop-shadow hover:bg-white hover:text-orange-400">Finalizar Compra</button>
    </app-main-wrapper>
  `,
})
export class HomePage {

  protected accountStore = inject(AccountsStore)

  protected labelText = 'Possui conta?';
  protected accountName = signal('');
  protected accountAmount = signal(0);
  protected totalExpenses = signal(20);
  protected amountAfterPurchase = signal(0);
  protected accountSelected = signal('');
}
