import { Injectable, signal } from "@angular/core";
import { BaseStoreDB } from "./base.store";
import { IndexedDBService } from "../services/indexeddb.service";
import { ProductStoreSchema } from "../models/storeModels";

@Injectable({ providedIn: "root"})
export class ProductsStore extends BaseStoreDB<'products'> {

    protected override storeName = 'products' as const;
    protected override signalRef = signal<ProductStoreSchema[]>([]);

    readonly products = this.signalRef.asReadonly();

    constructor(db: IndexedDBService){super(db);}

    add(product: Omit<ProductStoreSchema, 'updatedAt'>){
        this.signalRef.update(list => [
            ...list,
            this.touch({...product, updatedAt: 0})
        ]);
    };

    update(product: ProductStoreSchema){
        this.signalRef.update(list => 
            list.map((p) => {
                return p.id === product.id ? this.touch(product) : p;
            })
        )
    }

    remove(id: number){
        this.signalRef.update(
            list => list.filter(p => p.id !== id)
        )
    }
}