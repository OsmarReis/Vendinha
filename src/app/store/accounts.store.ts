import { Injectable, signal } from "@angular/core";
import { BaseStoreDB } from "./base.store";
import { IndexedDBService } from "../services/indexeddb.service";
import { AccountStoreSchema } from "../models/storeModels";

@Injectable({ providedIn: "root"})
export class AccountStore extends BaseStoreDB<'accounts'> {

    protected override storeName = 'accounts' as const;
    protected override signalRef = signal<AccountStoreSchema[]>([]);

    readonly accounts = this.signalRef.asReadonly();

    constructor(db: IndexedDBService){super(db)}

    add(account: Omit<AccountStoreSchema, 'updatedAt'>){
        this.signalRef.update(
            list => [...list, this.touch({...account, updatedAt: 0})]
        );
    };

    update(id: number, name: string){
        this.signalRef.update(
            list => list.map(
                (item) => {
                    return item.id === id ? item : item
                }
            )
        )
    }

    remove(id: number){
        this.signalRef.update(
            list => list.filter(a=>a.id !== id)
        );
    };
};