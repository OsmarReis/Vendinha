import { Injectable, signal } from "@angular/core";
import { BaseStoreDB } from "./base.store";
import { IndexedDBService } from "../services/indexeddb.service";
import { SaleStoreSchema } from "../models/storeModels";

@Injectable({ providedIn: "root"})
export class PurschaseStore extends BaseStoreDB<'sales'> {

    protected override storeName = 'sales' as const;
    protected override signalRef = signal<SaleStoreSchema[]>([]);

    readonly accounts = this.signalRef.asReadonly();

    constructor(db: IndexedDBService){super(db)}

    add(account: Omit<SaleStoreSchema, 'updatedAt'>){
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