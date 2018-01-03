import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { RateDataSource } from './Model/rate.datasource';
import { RateRepository } from "./Model/rate.repository";
import { InfoDataSource } from './Model/info.datasource';
import { InfoRepository } from "./Model/info.repository";

import { ExchangeComponent } from "./exchange.component";
import { InfoComponent } from "./info.component";

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, RouterModule],
    declarations: [ExchangeComponent, InfoComponent],
    providers: [RateRepository, RateDataSource, InfoRepository, InfoDataSource],
    exports: [ExchangeComponent,InfoComponent]
})
export class ExchangeModule { }