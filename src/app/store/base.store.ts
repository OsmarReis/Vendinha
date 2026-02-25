import { effect, WritableSignal } from "@angular/core";
import { IndexedDBService } from "../services/indexeddb.service";
import { DBSchema, BaseStoreSchema } from "../models/storeModels";

export abstract class BaseStoreDB<name extends keyof DBSchema> {

    protected abstract storeName: name;
    protected abstract signalRef: WritableSignal<DBSchema[name][]>;

    private previous = new Map<number, DBSchema[name]>();
    private debounceTimer: any;

    constructor( protected db: IndexedDBService) {}

    async init() {
        const data = await this.db.getAll(this.storeName);

        this.signalRef.set(data);

        this.previous = new Map(
            data.map(item => [item.id, item])
        );

        this.startPersistence();
    }

    private startPersistence() { 
        effect(() => {
            const currentList = this.signalRef();

            clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                const currentMap = new Map<number, DBSchema[name]>(
                    currentList.map(item => [item.id, item])
                );

                const toDelete: number[] = [];
                const toUpsert: DBSchema[name][] = [];

                for(const [id] of this.previous){
                    if(!currentMap.has(id)) {
                        toDelete.push(id);
                    }
                };

                for(const [id, item] of currentMap) {
                    const oldItem = this.previous.get(id);

                    if(
                        !oldItem ||
                        (oldItem as BaseStoreSchema).updatedAt !==
                        (item as BaseStoreSchema).updatedAt
                    ){
                        toUpsert.push(item);
                    };
                };

                if(toDelete.length === 0 && toUpsert.length === 0){
                    return;
                };

                this.db.batch(this.storeName, stores => {
                    const store = stores[this.storeName];

                    toDelete.forEach(id => store.delete(id));
                    toUpsert.forEach(item => store.put(item));
                });

                this.previous = currentMap;
            }, 300);
        });
    };

    protected touch<store extends BaseStoreSchema>(item: store): store {
        return {
            ...item,
            updatedAt: Date.now()
        };
    };
};