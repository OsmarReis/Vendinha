import { Component, inject, signal } from "@angular/core";
import { ProductsStore } from "../../../store/products.store";
import { ModalService } from "../../../services/modal.service";
import { InputComponent } from "../../form-components/input.component";

@Component({
    selector: 'app-product-create-modal',
    standalone: true,
    imports: [InputComponent],
    template: `
        <div class="flex flex-col gap-4">
            <h1 class="text-center text-xl font-semibold">{{createModalTexts.formTitle}}</h1>
            <app-input [placeholder]="createModalTexts.name" [model]="product.name"/>
            <app-input [placeholder]="createModalTexts.sellingPrice" type="currency" [model]="product.sellingPrice"/>
            <app-input [placeholder]="createModalTexts.buyingPrice" type="currency" [model]="product.buyingPrice"/>
            <button
                (click)="submit()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-orange-400 rounded-md border border-orange-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-orange-400 duration-200">
          <span class="w-full text-center pl-6">{{createModalTexts.submitBtn}}</span>
        </button>
            <button
                (click)="cancel()"
                class="w-full flex items-center justify-center py-4 pr-2 bg-gray-400 rounded-md border border-gray-400 text-base text-white uppercase font-semibold cursor-pointer hover:bg-white hover:text-gray-400 duration-200">
          <span class="w-full text-center pl-6">{{createModalTexts.cancelBtn}}</span>
        </button>
        </div>
    `,
})
export class AccountCreateModalComponent {

    private modalService = inject(ModalService);
    private productsStore = inject(ProductsStore);

    protected createModalTexts = {
        formTitle: "Adicionar Produto",
        name: "Nome do produto",
        sellingPrice: "Valor de venda por unidade",
        buyingPrice: "Custo por unidade",
        submitBtn: "Adicionar novo Produto",
        cancelBtn: "Voltar",
    }

    protected submitAlertTexts = {
        insertName: "INSIRA UM NOME!",
        priceErrorMsg: "INSIRA UM VALOR!",
        successName: "Produto Cadastrado com SUCESSO:",
        successSellingPrice: "VALOR DE VENDA: "
    }

    protected product = {
        name: signal(""),
        sellingPrice: signal(0),
        imgURL: signal(""),
        buyingPrice: signal(0),
        quantity: signal(0),
    }

    submit() {
        if(this.product.name() === ""){
            return alert(this.submitAlertTexts.insertName)
        } else if (this.product.sellingPrice() === 0) {
            return alert(this.submitAlertTexts.priceErrorMsg)
        }

        const newProduct = {
            id: Date.now(),
            name: this.product.name(),
            sellingPrice: this.product.sellingPrice(),
            imgURL: this.product.imgURL(),
            buyingPrice: this.product.buyingPrice(),
            quantity: this.product.quantity(),
            updatedAt: Date.now(),
        };

        this.productsStore.add(newProduct);

        this.modalService.close();

        alert(this.submitAlertTexts.successName + " " + this.product.name() + " " + this.submitAlertTexts.successSellingPrice + " " + this.product.sellingPrice())
    }

    cancel() {
        this.modalService.close();
    }
}