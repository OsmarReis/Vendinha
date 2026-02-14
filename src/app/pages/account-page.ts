import { Component, signal } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";
import { SearchAccountInput } from "../components/search-account-input/search-account-input";
import { accountData } from "../models/accountData";

@Component({
  selector: "app-account-page",
  imports: [MainWrapper, Wrapper, SearchAccountInput],
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <app-search-account-input
            [accountsData]="accountsData"
            (isAccountSelected)="setAccountSelected($event)"
          />
      </app-wrapper>

      <app-wrapper>
        <div class="flex flex-col gap-4 items-center py-4 text-base uppercase">
          <span >Nome: {{ accountName() }}</span>
        <span >Valor Inicial: R$ {{ accountInitialAmount() }}</span>
        <span >Total de Gastos: R$ {{ totalExpenses() }}</span>
        <span class="text-green-700/90 font-semibold">Valor Atual: R$ {{ accountInitialAmount() - totalExpenses() }}</span>
        </div>
      </app-wrapper>

      <app-wrapper>
        <span class="text-center text-base uppercase font-semibold">Gastos Recentes</span>
        <div class="w-full h-100 bg-[#F5F5F5] rounded border border-black/50">
          @for (item of accountProducts(); track $index) {
            <div class="p-2 border-b border-black/50">
              <span>{{ item.name }}</span>
              <span class="ml-2">Quantidade: {{ item.quantity }}</span>
            </div>
          }
        </div>
      </app-wrapper>

      <app-wrapper>
        
      </app-wrapper>

    </app-main-wrapper>
  `,
})
export class AccountPage {
  protected accountsData = accountData;
  protected accountName = signal('');
  protected accountInitialAmount = signal(0);
  protected accountProducts = signal<{ id: number; name: string; quantity: number; }[]>([
    {
      id: 1,
      name: 'Produto A',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Produto B',
      quantity: 1,
    }
  ]);
  protected totalExpenses = signal(20);
  protected accountSelected = signal('');

  setAccountSelected(value: string) {
    console.log(this.accountProducts())
    this.accountSelected.set(value);
    this.accountName.set(
      this.accountsData.find((acc) => acc.id === Number(value))?.name || '',
    );
    this.accountInitialAmount.set(
      this.accountsData.find((acc) => acc.id === Number(value))?.initalAmount ||
        0,
    );
  }
}