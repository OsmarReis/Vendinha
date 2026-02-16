import { Component, inject, signal } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";
import { SearchAccountInput } from "../components/search-account-input/search-account-input";
import { ShowAccountInfo } from "../components/show-account-info/show-account-info";
import { MatIconModule } from "@angular/material/icon";
import { ModalService } from "../services/modal.service";
import { AccountCreateModalComponent } from "../components/modal-components/account-create-modal.component";
import { AccountsStore } from "../store/accounts.store";
import { AccountStoreSchema } from "../models/storeModels";

@Component({
  selector: "app-account-page",
  imports: [MainWrapper, Wrapper, SearchAccountInput, ShowAccountInfo, MatIconModule],
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <app-search-account-input (isAccountSelected)="setAccountSelected($event)" [accountsData]="accountStore.accounts()"/>
      </app-wrapper>

      <app-wrapper>
        <app-show-account-info [selectedAccountData]="accountSelected()"/>
      </app-wrapper>

      <app-wrapper>
        <span class="text-center text-base uppercase font-semibold">Gastos em detalhes</span>
        <div class="w-full h-90 bg-[#F5F5F5] rounded border border-black/50 overflow-auto">
          @for (item of []; track $index) {
            <div class="p-2 border-b border-black/50">
              <span>Produto</span>
              <span class="ml-2">Quantidade:</span>
              <span>Preço:</span>
              <span>Total:</span>
            </div>
          }
        </div>
      </app-wrapper>

      <app-wrapper>
        <button class="w-full flex items-center justify-center py-2 pr-2 bg-[#F5F5F5] rounded-md border border-green-700 text-base text-green-700 uppercase font-semibold cursor-pointer hover:bg-green-700 hover:text-white duration-200">
          <span class="w-full text-center pl-6">Adicionar mais Saldo</span>
          <mat-icon fontIcon="add_circle_outlined"/>
        </button>
        <div class="w-full flex gap-2.5">
            <button class="w-full flex items-center justify-center py-2 pr-2 bg-[#F5F5F5] rounded-md border border-gray-700 text-base text-gray-700 uppercase font-semibold cursor-pointer hover:bg-gray-700 hover:text-white duration-200">
          <span class="w-full text-center pl-6">Alterar conta</span>
          <mat-icon fontIcon="edit"/>
        </button>
        <button class="w-full flex items-center justify-center py-2 pr-2 bg-[#F5F5F5] rounded-md border border-red-700 text-base text-red-700 uppercase font-semibold cursor-pointer hover:bg-red-700 hover:text-white duration-200">
          <span class="w-full text-center pl-6">Apagar conta</span>
          <mat-icon fontIcon="delete_forever"/>
        </button>
        </div>
      </app-wrapper>
      <button
        (click)="openCreateAccount()"
        class="w-full border border-orange-400 bg-orange-400 cursor-pointer text-white text-xl font-semibold uppercase py-4 rounded-md drop-shadow hover:bg-white hover:text-orange-400 duration-200"
      >Criar uma nova Conta</button>
    </app-main-wrapper>
  `,
})
export class AccountPage {

  protected accountStore = inject(AccountsStore)
  protected accountSelectedInput = signal('');
  protected accountSelected = signal<AccountStoreSchema | null>(null)

  setAccountSelected(value: string) {
    const account = this.accountStore.accounts().find((acc) => {
      return acc.id === Number(value)
    }) ?? null;
    
    this.accountSelected.set(account);
  }


  //Modais para conta
  private modalService = inject(ModalService);
  openCreateAccount() {
    this.modalService.open(AccountCreateModalComponent);
  };
}