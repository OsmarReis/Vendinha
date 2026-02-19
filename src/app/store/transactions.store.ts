import { Injectable, signal } from "@angular/core";
import { BaseStoreDB } from "./base.store";
import { IndexedDBService } from "../services/indexeddb.service";
import { TransactionStoreSchema } from "../models/storeModels";

@Injectable({ providedIn: "root"})
export class TransactionsStore extends BaseStoreDB<'transactions'> {

    protected override storeName = 'transactions' as const;
    protected override signalRef = signal<TransactionStoreSchema[]>([]);

    readonly accounts = this.signalRef.asReadonly();

    constructor(db: IndexedDBService){super(db)}

    add(account: Omit<TransactionStoreSchema, 'updateAt'>){
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