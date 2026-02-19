import { AccountsStore } from "../store/accounts.store";
import { AccountStoreSchema } from "../models/storeModels";
import { WritableSignal } from "@angular/core";

export function SendAccountSelected(
    value: string,
    store: AccountsStore,
    accSel: WritableSignal<AccountStoreSchema | null>) {
    const account = store.accounts().find((acc) => {
      return acc.id === Number(value)
    }) ?? null;
    
    accSel.set(account);
}