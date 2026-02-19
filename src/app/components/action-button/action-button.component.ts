import { Component, input, output } from "@angular/core";

@Component({
    selector: "app-action-button",
    imports: [],
    template: `
        <button
        (click)="actionOnClick()"
        class="w-full border border-orange-400 bg-orange-400 cursor-pointer text-white text-xl font-semibold uppercase py-4 rounded-md drop-shadow hover:bg-white hover:text-orange-400 duration-200"
      >
        <ng-content />
    </button>
    `
})

export class ActionButton {
    clickEvent = output();

    actionOnClick() {
        this.clickEvent.emit()
    }
}