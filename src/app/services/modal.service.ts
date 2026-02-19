import { Injectable, Type, signal } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ModalService {

    // ver se e qual component está aberto
    readonly component = signal<Type<any> | null>(null);

    // dados
    readonly data = signal<any>(null);

    open<T>(component: Type<T>, data?: any) {
        this.component.set(component);
        this.data.set(data ?? null);
    };

    close() {
        this.component.set(null);
        this.data.set(null);
    }
}