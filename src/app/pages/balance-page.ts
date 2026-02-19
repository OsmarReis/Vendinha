import { Component, signal } from "@angular/core";
import { MainWrapper } from "../components/main-wrapper/main-wrapper";
import { Wrapper } from "../components/wrapper/wrapper";
import { ActionButton } from "../components/action-button/action-button.component";

@Component({
  selector: "app-balance-page",
  imports: [MainWrapper, Wrapper, ActionButton],
  styles:`div > p {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }`,
  template: `
    <app-main-wrapper>
      <app-wrapper>
        <div class="w-ful flex flex-col gap-2">
        <p>
          Custo total de sua vendinha:
          <span>
          R$ {{vendingTotalCost()}}
        </span>
        </p>
        <p>
          Faturamento projetado:
          <span>
            R$ {{totalProjectedIncome()}}
          </span>
        </p>
        <br/>
        <p>
          Faturamento alcançado: 
          <span>
            R$ {{incomeAchieved()}}
          </span>
        </p>
        <p>
          Balanço final:
          <span>
            R$ {{finalBalance()}}
          </span>
        </p>
        <br/>
        <div class="flex justify-center items-center gap-3 text-base">
          Situação atual:
          <span [classList]="[classList, findClass() ]">
            @if (finalBalance() < 0) {
              Em prejuízo
            } @else if (finalBalance() > 0) {
              Lucro alcançado!
            } @else if (finalBalance() === 0) {
              Sem prejuízo, mas sem lucro
            } @else {
              ""
            }
          </span>
          </div>
        </div>
      </app-wrapper>

      <app-wrapper>
        <h1 class="text-base text-center uppercase font-semibold py-4">Transações feitas</h1>
        <div class="w-full h-100 border border-black/50 rounded bg-[#F5F5F5]">

        </div>
      </app-wrapper>
      <app-action-button>Adicionar compra de produto</app-action-button>
    </app-main-wrapper>
  `,
})
export class BalancePage {
  constructor(){
    this.vendingTotalCost.set(100)
    this.totalProjectedIncome.set(200)
    this.incomeAchieved.set(100)
    this.finalBalance.set(this.incomeAchieved() - this.vendingTotalCost())
  }

  protected vendingTotalCost = signal(0);
  protected totalProjectedIncome = signal(0);
  protected incomeAchieved = signal(0);
  protected finalBalance = signal(0);
  protected classList = " font-semibold uppercase ";
  protected findClass = () => {
    return this.finalBalance() < 0 ? " text-red-600 " : this.finalBalance() > 0 ? " text-green-600 " : " text-black "
  }
}