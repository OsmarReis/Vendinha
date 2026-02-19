import { Component, inject, signal } from "@angular/core";
import { AccountsStore } from "../../../store/accounts.store";
import { ModalService } from "../../../services/modal.service";
import { InputComponent } from "../../form-components/input.component";

@Component({
    selector: 'app-account-create-modal',
    standalone: true,
    imports: [InputComponent],
    template: `
        <div class="flex flex-col gap-4">
            <h1 class="text-center text-xl font-semibold">Criar conta</h1>
            <app-input placeholder="Digite um nome" [model]="name"/>
            <app-input placeholder="Valor à ser depositado" type="currency" [model]="depositedAmount"/>
            <button
                (click)="submit()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-orange-400 rounded-md border border-orange-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-orange-400 duration-200">
          <span class="w-full text-center pl-6">Criar conta</span>
        </button>
            <button
                (click)="cancel()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-gray-400 rounded-md border border-gray-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-gray-400 duration-200">
          <span class="w-full text-center pl-6">Voltar</span>
        </button>
        </div>
    `,
})
export class AccountCreateModalComponent {

    private modalService = inject(ModalService);
    private accountStore = inject(AccountsStore);

    name = signal("");
    depositedAmount = signal(0);

    setName () {

    }

    setDepositedAmount () {

    }

    submit() {
        if(this.name() === ""){
            return alert("INSIRA UM NOME!")
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

        alert(`Nome: ${this.name()} Saldo depositado: ${this.depositedAmount}`)
    }

    cancel() {
        this.modalService.close();
    }
}