import { Component, inject, signal } from "@angular/core";
import { AccountStore } from "../../../store/accounts.store";
import { ModalService } from "../../../services/modal.service";
import { InputComponent } from "../../form-components/input.component";

@Component({
    selector: 'app-account-create-modal',
    standalone: true,
    imports: [InputComponent],
    template: `
        <div class="flex flex-col gap-4">
            <h1 class="text-center text-xl font-semibold">{{createModalTexts.formTitle}}</h1>
            <app-input [placeholder]="createModalTexts.name" [model]="name"/>
            <app-input [placeholder]="createModalTexts.amount" type="currency" [model]="depositedAmount"/>
            <button
                (click)="submit()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-orange-400 rounded-md border border-orange-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-orange-400 duration-200">
          <span class="w-full text-center pl-6">{{createModalTexts.submitBtn}}</span>
        </button>
            <button
                (click)="cancel()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-gray-400 rounded-md border border-gray-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-gray-400 duration-200">
          <span class="w-full text-center pl-6">{{createModalTexts.cancelBtn}}</span>
        </button>
        </div>
    `,
})
export class AccountCreateModalComponent {

    private modalService = inject(ModalService);
    private accountStore = inject(AccountStore);

    protected createModalTexts = {
        formTitle: "Criar conta",
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

    protected submit() {
        if(this.name() === ""){
            return alert(this.submitAlertTexts.insertName)
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

        this.modalService.close();

        alert(this.submitAlertTexts.successName + " " + this.name() + " " + this.submitAlertTexts.successAmount + " " + this.depositedAmount())
    }

    protected cancel() {
        this.modalService.close();
    }
}