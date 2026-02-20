import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-search-product-input',
    imports: [MatIconModule],
    template: `
        <div class="w-full mt-2 flex items-center gap-4">
          <span class="w-1/2 text-base">{{selectLabelText}}</span>
          <div class="w-full flex items-center justify-between gap-2.5">
            <select
            name="search-product"
            id="search-product"
            class="w-full flex items-center justify-center bg-[#F5F5F5] font-semibold rounded-md border border-gray-200 pl-1.5 py-1.5"
          >
            <option value="">{{optionPlaceholderText}}</option>
          </select>
          <button class="px-2 flex justify-center items-center text-green-600">
            <mat-icon fontIcon="add_circle_outlined"></mat-icon>
          </button>
          </div>
        </div>
    `
})
export class SearchProductInput {
  protected productsData = [];
  protected selectLabelText = "Adicionar produto";
  protected optionPlaceholderText = "Escolher produto";
}