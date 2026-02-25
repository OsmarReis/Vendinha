import { Component, inject, input, output, signal } from "@angular/core";
import { ModalService } from "../../services/modal.service";

@Component({
    selector: "app-modal-form-buttons",
    imports: [],
    template: `
        <div class="flex flex-col gap-1">        
            <button
                (click)="submit()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-orange-400 rounded-md border border-orange-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-orange-400 duration-200">
          <span class="w-full text-center pl-6">{{submitBtnText()}}</span>
        </button>
            <button
                (click)="cancel()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-gray-400 rounded-md border border-gray-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-gray-400 duration-200">
          <span class="w-full text-center pl-6">{{cancelBtnText()}}</span>
        </button>
        </div>
    `
})

export class ModalFormButtons {
    
    submitBtnText = input("SUBMIT");
    cancelBtnText = input("CANCEL");
    fnCallback = input();
    signalTrue = signal(false);
    callbackFn = output();

    protected modalService = inject(ModalService);

    protected submit() {
        if(this.fnCallback() === true){
            this.modalService.close();
        }
    }

    protected cancel() {
        this.modalService.close();
    }
}