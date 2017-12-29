import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RateDataSource } from './Model/rate.datasource';
import { RateRepository } from "./Model/rate.repository";

import { ExchangeComponent } from "./exchange.component";
import { InfoComponent } from "./info.component";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [ExchangeComponent, InfoComponent],
    providers: [RateRepository, RateDataSource],
    exports: [ExchangeComponent,InfoComponent]
})
export class ExchangeModule { }