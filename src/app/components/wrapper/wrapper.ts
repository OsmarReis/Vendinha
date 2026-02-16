import { Component } from "@angular/core";

@Component({
    selector: "app-wrapper",
    imports: [],
    template: `
        <div class="w-full p-2.5 flex flex-col gap-2.5 rounded-lg bg-white drop-shadow">
            <ng-content />
        </div>
    `
})
export class Wrapper {

}