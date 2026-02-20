import { Component } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";

@Component({
  selector: "app-products-page",
  imports:[MainWrapper, Wrapper],
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <h1 class="text-center text-base font-medium py-4">{{productsPageTexts.productsRegisteredTitle}}</h1>
        <div class="w-full h-155">

        </div>
      </app-wrapper>
      <button class="w-full border border-orange-400 bg-orange-400 cursor-pointer text-white text-xl font-semibold uppercase py-4 rounded-md drop-shadow hover:bg-white hover:text-orange-400">Adicionar produto</button>
    </app-main-wrapper>
  `,
})
export class ProductsPage {
  
  
  
  protected productsPageTexts = {
    productsRegisteredTitle: "Lista de produtos cadastrados"
  }
}