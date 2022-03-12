import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from "./main-header/main-header.component";
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
