import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { ExchangeModule } from "./exchange.module";

import { AppComponent } from './app.component';
import { InfoComponent } from "./info.component";
import { ExchangeComponent } from "./exchange.component";


@NgModule({
  declarations: [
    AppComponent, InfoComponent
  ],
  imports: [
    BrowserModule, HttpModule, ExchangeModule
  ],
  exports : [ExchangeComponent, InfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
