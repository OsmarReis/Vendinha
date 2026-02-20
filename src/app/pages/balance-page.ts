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
          {{balancePageTexts.vendingTotalCostTxt}}
          <span>
          {{balancePageTexts.currencySymbol}} {{vendingTotalCost()}}
        </span>
        </p>
        <p>
          {{balancePageTexts.projectedIncomeTxt}}
          <span>
            {{balancePageTexts.currencySymbol}} {{totalProjectedIncome()}}
          </span>
        </p>
        <br/>
        <p>
          {{balancePageTexts.incomeAchievedTxt}} 
          <span>
            {{balancePageTexts.currencySymbol}} {{incomeAchieved()}}
          </span>
        </p>
        <p>
          {{balancePageTexts.finalBalanceTxt}}
          <span>
            {{balancePageTexts.currencySymbol}} {{finalBalance()}}
          </span>
        </p>
        <br/>
        <div class="flex justify-center items-center gap-3 text-base">
          {{balancePageTexts.currentSituation}}
          <span [classList]="[classList, findClass() ]">
            @if (finalBalance() < 0) {
              {{balancePageTexts.lossSituation}}
            } @else if (finalBalance() > 0) {
              {{balancePageTexts.profitSituation}}
            } @else if (finalBalance() === 0) {
              {{balancePageTexts.neutralSituation}}
            } @else {
              ""
            }
          </span>
          </div>
        </div>
      </app-wrapper>

      <app-wrapper>
        <h1 class="text-base text-center uppercase font-semibold py-4">{{balancePageTexts.transactionsListTitle}}</h1>
        <div class="w-full h-100 border border-black/50 rounded bg-[#F5F5F5]">

        </div>
      </app-wrapper>
      <app-action-button>{{balancePageTexts.actionBtn}}</app-action-button>
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

  protected balancePageTexts = {
    actionBtn: "Adicionar compra de produto",
    transactionsListTitle: "Transações feitas",
    currentSituation: "Situação atual:",
    lossSituation: "Em prejuízo",
    profitSituation: "Lucro alcançado!",
    neutralSituation: "Sem prejuízo, mas sem lucro",
    finalBalanceTxt: "Balanço final:",
    incomeAchievedTxt: "Faturamento alcançado:",
    projectedIncomeTxt: "Faturamento esperado:",
    vendingTotalCostTxt: "Custo total de sua vendinha:",
    currencySymbol: "R$",
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