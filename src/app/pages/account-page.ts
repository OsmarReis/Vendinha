import { Component, inject, signal } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";
import { SearchAccountInput } from "../components/search-account-input/search-account-input";
import { ShowAccountInfo } from "../components/show-account-info/show-account-info";
import { MatIconModule } from "@angular/material/icon";
import { ModalService } from "../services/modal.service";
import { AccountCreateModalComponent } from "../components/modal-components/account-modals/account-create-modal.component";
import { AccountsStore } from "../store/accounts.store";
import { AccountStoreSchema } from "../models/storeModels";
import { ActionButton } from "../components/action-button/action-button.component";
import { SendAccountSelected } from "../services/sendAccountSelected.service";

@Component({
  selector: "app-account-page",
  imports: [MainWrapper, Wrapper, SearchAccountInput, ShowAccountInfo, ActionButton, MatIconModule],
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <div class="w-full flex gap-2">
          <app-search-account-input class="w-full" (isAccountSelected)="setAccount($event)" [accountsData]="accountStore.accounts()"/>
            <button class="text-gray-700 px-2">
          <mat-icon fontIcon="edit"/>
        </button>
        <button class="text-red-700 px-2">
          <mat-icon fontIcon="delete_forever"/>
        </button>
        </div>
      </app-wrapper>

      <app-wrapper>
        <app-show-account-info [accountData]="accountSelected()"/>
      </app-wrapper>

      <app-wrapper>
        <span class="text-center text-base uppercase font-semibold">Gastos em detalhes</span>
        <div class="w-full h-100 bg-[#F5F5F5] rounded border border-black/50 overflow-auto">
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
      </app-wrapper>
      <app-action-button (clickEvent)="openCreateAccount()">
          Criar uma nova conta
      </app-action-button>
    </app-main-wrapper>
  `,
})
export class AccountPage {

  protected accountStore = inject(AccountsStore)
  protected accountSelected = signal<AccountStoreSchema | null>(null)

  setAccount(value: string) {
    SendAccountSelected(value, this.accountStore, this.accountSelected)
  }

  //Modais para conta
  private modalService = inject(ModalService);
  openCreateAccount() {
    this.modalService.open(AccountCreateModalComponent);
  };
}