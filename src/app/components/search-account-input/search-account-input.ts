import { Component, input, output, signal } from '@angular/core';
import { AccountStoreSchema } from '../../models/storeModels';


@Component({
  selector: 'app-search-account-input',
  imports: [],
  template: `
    <div 
        class="w-full flex items-center gap-4"
    >
        @if(hasTextLabel() !== '') {
            <span class="w-1/2 text-base">{{ hasTextLabel() }}</span>
        }
    <select
      name="search-account"
      id="search-account"
      (change)="selectAccount($event)"
      class="w-full flex items-center justify-center bg-[#F5F5F5] font-semibold rounded-md border border-gray-200 pl-1.5 py-1.5"
    >
      <option value="">Escolha uma conta</option>
      @for (account of accountsData(); track account.id) {
        <option [value]="account.id">{{account.id}} - {{ account.name }}</option>
      }
    </select>
    </div>
  `,
})
export class SearchAccountInput {
  accountsData = input<AccountStoreSchema[]>([]);
  hasTextLabel = input("");
  protected selectedAccount = signal(' ');
  protected isAccountSelected = output<string>();

  selectAccount($event: Event) {
    this.selectedAccount.set(($event.target as HTMLSelectElement).value);
    this.isAccountSelected.emit(this.selectedAccount());
  }
}
