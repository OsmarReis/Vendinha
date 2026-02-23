import { Injectable } from "@angular/core";
import { DBSchema } from "../models/storeModels";

const DB_NAME = "app-DB";
const DB_VERSION = 1;

const STORES: Record<keyof DBSchema, keyof DBSchema> = {
    accounts: "accounts",
    products: "products",
    purschases: "purschases",
    sales: "sales"
}

@Injectable({ providedIn: "root" })
export class IndexedDBService {
    
    private db!: IDBDatabase;

    async init(): Promise<void> {
        return new Promise ((resolve, reject) => {

            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;

                Object.values(STORES).forEach(storeName => {
                    this.createStoreIfNotExists(db, storeName)
                });
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    };

    private createStoreIfNotExists(
        db: IDBDatabase,
        name: keyof DBSchema
    ) {
        if(!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, { keyPath: "id" })
        }
    }

    getAll<name extends keyof DBSchema>(
        storeName: name
    ): Promise<DBSchema[name][]>{
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result as DBSchema[name][]);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    };

    getById<name extends keyof DBSchema>(
        storeName: name,
        id: string
    ): Promise<DBSchema[name] | undefined> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result as DBSchema[name] | undefined)
            };

            request.onerror = () => {
                reject(request.error);
            }
        })
    }

    put<name extends keyof DBSchema>(
        storeName: name,
        value: DBSchema[name]
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            store.put(value);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        })
    }

    delete<name extends keyof DBSchema>(
        storeName: name,
        id: string,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            store.delete(id);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        })
    }

    batch<name extends keyof DBSchema>(
        storeNames: name | name[],
        callback: (stores: Record<name, IDBObjectStore>) => void
    ): Promise<void>{
        return new Promise((resolve, reject) => {
            const namesArray = Array.isArray(storeNames)
                ? storeNames
                : [storeNames];

            const transaction = this.db.transaction(namesArray, "readwrite")
            const stores = {} as Record<name, IDBObjectStore>;

            namesArray.forEach((name) => {
                stores[name] = transaction.objectStore(name);
            });

            callback(stores);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        })
    }
};