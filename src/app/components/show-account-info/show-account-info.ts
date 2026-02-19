import { Component, input } from "@angular/core";
import { AccountStoreSchema } from "../../models/storeModels";
import { CurrencyDisplay } from "../../services/displayCurrency.service";

@Component({
    selector: "app-show-account-info",
    imports: [],
    template: `
    <div class="flex flex-col gap-3 items-center py-3 text-base uppercase">
          <span >Nome: {{accountData()?.name}} </span>
        <span >Valor Inicial: R$ {{initialAmount()}}</span>
        <span >Total de Gastos: R$ {{totalExpenses()}}</span>
        <span class="text-green-700/90 font-semibold">Valor Atual: R$ {{currentAmount()}}</span>
    </div>
    `
})

export class ShowAccountInfo {
    accountData = input<AccountStoreSchema | null>();
    protected initialAmount = () => CurrencyDisplay(this.accountData()?.depositedAmount ?? 0);
    protected totalExpenses = () => CurrencyDisplay(this.accountData()?.totalExpenses ?? 0);
    protected currentAmount = () => CurrencyDisplay(Number(this.accountData()?.depositedAmount) - Number(this.accountData()?.totalExpenses));
}