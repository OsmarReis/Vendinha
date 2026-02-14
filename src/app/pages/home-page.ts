import { Component, signal } from '@angular/core';
import { MainWrapper } from '../components/main-wrapper/main-wrapper';
import { Wrapper } from '../components/wrapper/wrapper';
import { SearchAccountInput } from '../components/search-account-input/search-account-input';
import { accountData } from '../models/accountData';
import { SearchProductInput } from '../components/search-product-input/search-product-input';

@Component({
  selector: 'app-home-page',
  imports: [MainWrapper, Wrapper, SearchAccountInput, SearchProductInput],
  template: `
    <app-main-wrapper>
      <app-wrapper>
          <app-search-account-input
            [accountsData]="accountsData"
            [hasTextLabel]="labelText"
            (isAccountSelected)="setAccountSelected($event)"
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

      <button class="w-full border border-orange-600 bg-orange-600 cursor-pointer text-white text-xl font-semibold uppercase py-4 rounded-md drop-shadow hover:bg-white hover:text-orange-600">Finalizar Compra</button>
    </app-main-wrapper>
  `,
})
export class HomePage {
  protected labelText = 'Possui conta?';
  protected accountsData = accountData;
  protected accountName = signal('');
  protected accountAmount = signal(0);
  protected totalExpenses = signal(20);
  protected amountAfterPurchase = signal(0);
  protected accountSelected = signal('');

  setAccountSelected(value: string) {
    this.accountSelected.set(value);
    this.accountName.set(
      this.accountsData.find((acc) => acc.id === Number(value))?.name || '',
    );
    this.accountAmount.set(
      this.accountsData.find((acc) => acc.id === Number(value))?.initalAmount ||
        0,
    );
    this.amountAfterPurchase.set(this.accountAmount() - this.totalExpenses());
  }
}
