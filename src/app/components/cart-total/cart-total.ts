import { Component, input } from "@angular/core";
import { AccountStoreSchema } from "../../models/storeModels";
import { CurrencyDisplay } from "../../services/displayCurrency.service";

@Component({
    selector: "app-cart-total",
    imports:[],
    template:`
        <div class="w-full flex items-end">
            <div class="w-full">
              <p class="text-xs">
                Saldo da conta
                <span class="bg-[#F5F5F5] py-0.5 px-1"
                  >{{ accountData()?.name }}</span
                >:
                <span>R$ {{ currentAmountDisplay() }}</span>
              </p>
              <p class="text-xs">
                Saldo após compra: R$
                {{ amountAfterPurchase() }}
              </p>
            </div>

          <p class="w-full pt-1.5 text-right text-xl font-semibold">
            Total: R$ {{ cartTotalDisplay() }}
          </p>
        </div>
    `
})
export class CartTotal {
    accountData = input<AccountStoreSchema | null>();
    cartTotalInput = input(0);

    protected currentAmount = () => (Number(this.accountData()?.depositedAmount) - Number(this.accountData()?.totalExpenses));

    protected currentAmountDisplay = () => CurrencyDisplay(this.currentAmount());
    protected amountAfterPurchase = () => CurrencyDisplay(this.currentAmount() - this.cartTotalInput());
    protected cartTotalDisplay = () => CurrencyDisplay(this.cartTotalInput());
}