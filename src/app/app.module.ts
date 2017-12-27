import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { RateDataSource } from './Model/rate.datasource';
import { RateRepository } from "./Model/rate.repository";

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpModule
  ],
  providers: [RateRepository, RateDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
