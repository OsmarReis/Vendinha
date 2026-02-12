import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

export interface NavLinksI {
  svgIcon: string;
  urlPath: string;
  name: string;
}

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, MatIconModule, RouterLinkActive],
  template:`
  <nav class="w-full h-24 fixed bottom-0 bg-white flex px-4">
        @for (item of navLinksArr(); track $index) {
          <a routerLink={{item.urlPath}}  [routerLinkActive]="colorActive" [routerLinkActiveOptions]="{ exact: true }" class="w-full pt-1 flex flex-col justify-start items-center text-xs ease-linear duration-75">
            <div class="size-12 flex justify-center items-center">
                <mat-icon fontIcon={{item.svgIcon}}/>
            </div>
            {{item.name}}
          </a>
        }
  </nav>
  `,
})

export class NavMenu {
  navLinksArr = input<NavLinksI[]>();
  colorActive = "text-blue-800 border-t-3"
}
