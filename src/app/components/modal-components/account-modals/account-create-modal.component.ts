import { Component, inject, signal } from "@angular/core";
import { AccountStore } from "../../../store/accounts.store";
import { InputComponent } from "../../form-components/input.component";
import { ModalFormButtons } from "../../form-components/button.component";

@Component({
    selector: 'app-account-create-modal',
    standalone: true,
    imports: [InputComponent, ModalFormButtons],
    template: `
        <div class="flex flex-col gap-4">
            <h1 class="text-center text-xl font-semibold">{{createModalTexts.formTitle}}</h1>
            <app-input [placeholder]="createModalTexts.name" [model]="name"/>
            <app-input [placeholder]="createModalTexts.amount" type="currency" [model]="depositedAmount"/>
            <app-modal-form-buttons
                [submitBtnText]="createModalTexts.submitBtn"
                [cancelBtnText]="createModalTexts.cancelBtn"
                (fnCallback)="createAccount()"
            />
        </div>
    `,
})
export class AccountCreateModalComponent {

    private accountStore = inject(AccountStore);

    protected createModalTexts = {
        formTitle: "Criar uma nova conta!",
        name: "Digite um nome",
        amount: "Valor à ser depositado",
        submitBtn: "Criar conta",
        cancelBtn: "Voltar",
    }

    protected submitAlertTexts = {
        insertName: "INSIRA UM NOME!",
        successName: "Nome:",
        successAmount: "Saldo depositado:"
    }

    protected name = signal("");
    protected depositedAmount = signal(0);

    protected createAccount(): boolean {
        if(this.name() === ""){
            alert(this.submitAlertTexts.insertName);
            return false;
        }

        const newAccount = {
            id: Date.now(),
            name: this.name(),
            depositedAmount: this.depositedAmount(),
            totalExpenses: 0,
            productsBought: [],
            updatedAt: Date.now()
        };

        this.accountStore.add(newAccount);
        alert(this.submitAlertTexts.successName + " " + this.name() + " " + this.submitAlertTexts.successAmount + " " + this.depositedAmount())
        return true;
    }
}