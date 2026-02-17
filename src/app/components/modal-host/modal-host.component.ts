import { Component, inject } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-modal-host',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if(modalService.component()){
            <div id="backdrop" class="fixed p-6 inset-0 bg-black/50 flex justify-center items-center z-50">
                <div id="modal" class="bg-white p-5 rounded-lg w-full">
                    <ng-content *ngComponentOutlet="modalService.component()"/>
                </div>
            </div>
        }
    `
})
export class ModalHostComponent{
    modalService = inject(ModalService);
}