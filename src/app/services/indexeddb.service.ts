import { Injectable } from "@angular/core";
import { DBSchema } from "../models/storeModels";

const enums = {
    appDB: "app-DB",
    id: "id",
    accounts: "accounts",
    products: "products",
    transactions: "transactions",
}

@Injectable({ providedIn: "root" })
export class IndexedDBService {
    
    private db!: IDBDatabase;

    async init(): Promise<void> {
        return new Promise ((resolve, reject) => {

            const request = indexedDB.open(enums.appDB, 1)

            request.onupgradeneeded = (event: any) => { //verificar esse any
                const db = event.target.result as IDBDatabase;

                if(!db.objectStoreNames.contains(enums.accounts)) {
                    db.createObjectStore(enums.accounts, { keyPath: enums.id })
                };

                if(!db.objectStoreNames.contains(enums.products)) {
                    db.createObjectStore(enums.products, { keyPath: enums.id })
                };

                if(!db.objectStoreNames.contains(enums.transactions)) {
                    db.createObjectStore(enums.transactions, { keyPath: enums.id })
                };
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    };

    getAll<K extends keyof DBSchema>(
        storeName: K
    ): Promise<DBSchema[K][]>{
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result as DBSchema[K][]);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    };

    batch<K extends keyof DBSchema>(
        storeName: K,
        callback: (store: IDBObjectStore) => void
    ): Promise<void>{
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite")
            const store = transaction.objectStore(storeName);

            callback(store);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        })
    }
};