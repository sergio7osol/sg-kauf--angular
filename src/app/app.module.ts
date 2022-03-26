import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { BasicHighlightDirective } from './directives/basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight/better-highlight.directive';
import { BuySectionComponent } from './components/buy-section/buy-section.component';
import { BuyListComponent } from './components/buy-section/buy-list/buy-list.component';
import { BuyComponent } from './components/buy-section/buy-list/buy/buy.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LeftMenuComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    BuySectionComponent,
    BuyListComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ListboxModule,
    TableModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
