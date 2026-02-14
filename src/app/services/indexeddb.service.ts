import { Injectable } from "@angular/core";
import { DBSchema } from "../types/tsinterfaces";

@Injectable({ providedIn: "root" })
export class IndexedDBService {
    private dbName = "SalesManagementDB";
    private dbVersion = 1;
    private db!: IDBDatabase;

    async initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                db.createObjectStore("accounts", { keyPath: "id" });
                db.createObjectStore("products", { keyPath: "id" });
                db.createObjectStore("transactions", { keyPath: "id" });
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onerror = (event) => {
                reject(`IndexedDB error: ${(event.target as IDBOpenDBRequest).error}`);
            };
        })
    };

    async getAll<K extends keyof DBSchema>(
        storeName: K
    ): Promise<DBSchema[K][]> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(`IndexedDB error: ${(event.target as IDBRequest).error}`);
            };
        });
    };

    async put<K extends keyof DBSchema>(
        storeName: K,
        data: DBSchema[K]
    ): Promise<void> {
        return new Promise(() => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            
            store.put(data);

            transaction.oncomplete = () => {
                console.log("Data successfully saved to IndexedDB");
            };

            transaction.onerror = (event) => {
                console.error("Error saving data to IndexedDB:", (event.target as IDBRequest<any>).error);
            };
        })
    };

    async delete<K extends keyof DBSchema>(
        storeName: K,
        id: number
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const deleteRequest = store.delete(id);
            deleteRequest.onsuccess = () => {
                console.log("Data successfully deleted from IndexedDB");
                resolve();
            };
            deleteRequest.onerror = (event) => {
                console.error("Error deleting data from IndexedDB:", (event.target as IDBRequest<any>).error);
                reject((event.target as IDBRequest<any>).error);
            };
        });
    };

    async clear<K extends keyof DBSchema>(storeName: K): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const clearRequest = store.clear();
            
            clearRequest.onsuccess = () => {
                console.log("Data successfully cleared from IndexedDB");
                resolve();
            };
            clearRequest.onerror = (event) => {
                console.error("Error clearing data from IndexedDB:", (event.target as IDBRequest<any>).error);
                reject((event.target as IDBRequest<any>).error);
            };
        })
    };
}