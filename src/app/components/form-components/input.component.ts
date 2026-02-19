import { CommonModule } from "@angular/common";
import { Component, computed, Input, WritableSignal } from "@angular/core";
import { CurrencyCode } from "../../types/tsinterfaces";

@Component({
    selector: "app-input",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="w-full flex gap-2 items-center justify-start">
            @if(label){
                <label class="">
                    {{label}}
                </label>
            }
            @if(type==='currency'){
                <div class="w-full flex items-center text-base">
                    <span class="absolute ml-3">{{prefix()}}</span>
                    <input
                      [type]="type"
                      [value]="displayValue()"
                      (input)="onInput($event)"
                      class="w-full h-full text-xl text-right pr-3 py-2.5 bg-[#F5F5F5] border border-black/50 rounded-lg"
                      />
                </div>
            } @else {
                <input
              [type]="type"
              [value]="displayValue()"
              [placeholder]="placeholder"
              (input)="onInput($event)"
              class="w-full text-base pl-3 py-2.5 bg-[#F5F5F5] border border-black/50 rounded-lg"
            />
            }
            
        </div>
    `
})
export class InputComponent {

    @Input ({ required: true })
    model!: WritableSignal<string | number>;

    @Input() label = "";

    @Input() type: 'text' | 'number' | 'currency' = 'text';

    @Input() placeholder = "";

    @Input() currencyCode: CurrencyCode = "BRL";

    prefix = computed(() => {
        switch (this.currencyCode) {
            case 'USD': return '$';
            case 'BRL': return 'R$';
            default: return ';'
        }
    })

    displayValue = computed(() => {
        if(this.type !== 'currency') {
            return this.model();
        };

        const value = this.model() as number;

        const cents = value.toString().padStart(3, '0');

        const integer = cents.slice(0, -2);
        const decimal = cents.slice(-2);

        return `${Number(integer)},${decimal}`
    })

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        let raw = input.value;

        if(this.type === 'currency'){
            raw = raw.replace(/\D/g, '');

            const cents = Number(raw);

            this.model.set(cents);

            return
        }

        if(this.type === "number") {
            this.model.set(Number(raw));
            return;
        } 
        
        this.model.set(raw);
        
    }
}