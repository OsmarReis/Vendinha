import { Component, inject, signal } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";
import { SearchAccountInput } from "../components/search-account-input/search-account-input";
import { ShowAccountInfo } from "../components/show-account-info/show-account-info";
import { MatIconModule } from "@angular/material/icon";
import { ModalService } from "../services/modal.service";
import { AccountCreateModalComponent } from "../components/modal-components/account-modals/account-create-modal.component";
import { AccountStore } from "../store/accounts.store";
import { AccountStoreSchema } from "../models/storeModels";
import { ActionButton } from "../components/action-button/action-button.component";
import { SendAccountSelected } from "../services/sendAccountSelected.service";
import { AccountDeleteModalComponent } from "../components/modal-components/account-modals/account-delete-modal.component";

@Component({
  selector: "app-account-page",
  imports: [MainWrapper, Wrapper, SearchAccountInput, ShowAccountInfo, ActionButton, MatIconModule],
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <div class="w-full flex gap-2">
          <app-search-account-input class="w-full" (isAccountSelected)="setAccount($event)" [accountsData]="accountStore.accounts()"/>
            <button class="text-gray-700 px-2">
          <mat-icon [fontIcon]="accountPagesIconsRef.edit"/>
        </button>
        <button (click)="openRemoveAccount()" class="text-red-700 px-2">
          <mat-icon [fontIcon]="accountPagesIconsRef.remove"/>
        </button>
        </div>
      </app-wrapper>

      <app-wrapper>
        <app-show-account-info [accountData]="accountSelected()"/>
      </app-wrapper>

      <app-wrapper>
        <span class="text-center text-base uppercase font-semibold">{{accountPagesTexts.detailExpenses}}</span>
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
          <span class="w-full text-center pl-6">{{accountPagesTexts.addAmount}}</span>
          <mat-icon [fontIcon]="accountPagesIconsRef.add"/>
        </button>
      </app-wrapper>
      <app-action-button (clickEvent)="openCreateAccount()">
          {{accountPagesTexts.actionBtn}}
      </app-action-button>
    </app-main-wrapper>
  `,
})
export class AccountPage {

  protected accountStore = inject(AccountStore)
  protected accountSelected = signal<AccountStoreSchema | null>(null)

  protected accountPagesTexts = {
    actionBtn: "Criar uma nova conta",
    addAmount: "Adicionar saldo",
    detailExpenses: "Gastos em detalhes",
  }

  protected accountPagesIconsRef = {
    edit: "edit",
    remove: "delete_forever",
    add: "add_circle_outlined",
  }

  protected setAccount(value: string) {
    SendAccountSelected(value, this.accountStore, this.accountSelected)
  }

  //Modais para conta
  private modalService = inject(ModalService);
  protected openCreateAccount() {
    this.modalService.open(AccountCreateModalComponent);
  };

  protected openEditAccount() {
  }

  protected openRemoveAccount() {
    if(this.accountSelected() === null) {
      return;
    } else {
      this.modalService.open(AccountDeleteModalComponent, this.accountSelected());
    }
  }
}