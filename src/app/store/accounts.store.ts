import { Injectable, signal } from "@angular/core";
import { BaseStoreDB } from "./base.store";
import { IndexedDBService } from "../services/indexeddb.service";
import { AccountStoreSchema } from "../models/storeModels";

@Injectable({ providedIn: "root"})
export class AccountsStore extends BaseStoreDB<'accounts'> {

    protected override storeName = 'accounts' as const;
    protected override signalRef = signal<AccountStoreSchema[]>([]);

    readonly accounts = this.signalRef.asReadonly();

    constructor(db: IndexedDBService){super(db)}

    add(account: Omit<AccountStoreSchema, 'updateAt'>){
        this.signalRef.update(
            list => [...list, this.touch({...account, updatedAt: 0})]
        );
    };

    remove(id: number){
        this.signalRef.update(
            list => list.filter(a=>a.id !== id)
        );
    };
};