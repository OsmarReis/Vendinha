import { computed, effect, Injectable, signal, WritableSignal } from "@angular/core";
import { AccountI, ProductI, TransactionI, DBSchema  } from "../types/tsinterfaces";
import { IndexedDBService } from "../services/indexeddb.service";

@Injectable({ providedIn: "root" })
export class SalesAppStore {

    private _accounts = signal<AccountI[]>([]);
    private _products = signal<ProductI[]>([]);
    private _transactions = signal<TransactionI[]>([]);

    private async hydrateSignal<K extends keyof DBSchema>(
        signalRef: WritableSignal<DBSchema[K][]>,
        storeName: K
    ):Promise<void> {
        const data = await this.db.getAll(storeName);
        signalRef.set(data);
    }

    private persistIncrementalData<K extends keyof DBSchema>(
            signalRef: WritableSignal<DBSchema[K][]>,
            storeName: K
        ) {
            let previous = new Map<number, DBSchema[K]>();
            effect(() => {
                const currentList = signalRef();
                const currentMap = new Map(currentList.map(item => [item.id, item]));

                //Detecta itens removidos
                previous.forEach((_, id) => {
                    if (!currentMap.has(id)) {
                        this.db.delete(storeName, id);
                    }
                })

                //Detecta itens adicionados ou atualizados
                currentMap.forEach((item, id) => {
                    const oldItem = previous.get(id);

                    if (!oldItem || JSON.stringify(oldItem) !== JSON.stringify(item)) {
                        this.db.put(storeName, item);
                    }
                });

                previous = currentMap;

            })
        }

    accounts$ = this._accounts.asReadonly();
    products$ = this._products.asReadonly();
    transactions$ = this._transactions.asReadonly();

    totalBuyPriceProducts$ = computed(() => {
        return this._products().reduce((total, product) => total + (product.buyPrice * product.quantity), 0);
    });

    totalSellPriceProducts$ = computed(() => {
        return this._products().reduce((total, product) => total + (product.sellPrice * product.quantity), 0);
    });

    constructor( private db: IndexedDBService) {
        this.init();
    }

    async init() {
        await this.db.initDB();

        //Hidratar os sinais com os dados do IndexedDB
        await Promise.all([
            this.hydrateSignal(this._accounts, "accounts"),
            this.hydrateSignal(this._products, "products"),
            this.hydrateSignal(this._transactions, "transactions")
        ]);

        //Persistência Automática e incremental
        this.persistIncrementalData(this._accounts, "accounts");
        this.persistIncrementalData(this._products, "products");
        this.persistIncrementalData(this._transactions, "transactions");
    };
}