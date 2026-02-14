import { Component } from "@angular/core";

@Component({
    selector: "app-main-wrapper",
    imports: [],
    template: `
        <div class="w-full h-full p-4 flex flex-col gap-2">
            <ng-content />
        </div>
    `
})
export class MainWrapper {

}