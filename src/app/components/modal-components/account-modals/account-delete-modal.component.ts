import { Component, inject, input } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { AccountStore } from "../../../store/accounts.store";
import { AccountStoreSchema } from "../../../models/storeModels";
import { CurrencyDisplay } from "../../../services/displayCurrency.service";
import { ModalFormButtons } from "../../form-components/button.component";

@Component({
    selector: "app-account-delete-modal",
    imports: [ModalFormButtons],
    template: `
            <div class="flex flex-col gap-8">
                <h1 class="text-center text-xl font-semibold" >{{deleteModalTexts.formTitle}}</h1>
            <div class="text-base flex flex-col gap-2">
                <p>{{deleteModalTexts.accName}} {{account.name}}</p>
                <p>{{deleteModalTexts.accCurrentAmount}} {{deleteModalTexts.currencySymbol}} {{accountCurrentAmount}}</p>
                <p>{{deleteModalTexts.accExpenses}} {{deleteModalTexts.currencySymbol}} {{accountTotalExpenses}}</p>
            </div>            
        <app-modal-form-buttons
            [submitBtnText]="deleteModalTexts.submitBtn"
            [cancelBtnText]="deleteModalTexts.cancelBtn" 
            (callbackFn)="deleteAccount()"
        />
            </div>
    `
})
export class AccountDeleteModalComponent {
    private modalService = inject(ModalService);
    private accountStore = inject(AccountStore);

    
    protected account: AccountStoreSchema = this.modalService.data();
    protected accountCurrentAmount = CurrencyDisplay(this.account.depositedAmount - this.account.totalExpenses);
    protected accountTotalExpenses = CurrencyDisplay(this.account.totalExpenses);

    protected deleteModalTexts = {
        formTitle: "Deseja deletar a conta?",
        accName: "Nome:",
        accCurrentAmount: "Saldo Atual:",
        accExpenses: "Gastos:",
        currencySymbol: "R$",
        submitBtn: "APAGAR",
        cancelBtn: "CANCELAR",
        alertTxtMsg: "Conta removida",
    }


    protected deleteAccount() {
        this.accountStore.remove(this.account.id)
        alert(this.deleteModalTexts.alertTxtMsg)
    }
}