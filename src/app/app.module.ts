import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ExchangeModule } from './exchange.module';

import { AppComponent } from './app.component';
import { InfoComponent } from './info.component';
import { ExchangeComponent } from './exchange.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ExchangeModule, RouterModule.forRoot([
        { path: 'exchange', component: ExchangeComponent },
        { path: 'terms', component: InfoComponent },
        { path: 'privacy', component: InfoComponent },
        { path: 'faq', component: InfoComponent },
        { path: 'complete', component: InfoComponent },
        {
          path: 'admin',
          loadChildren: 'app/admin/admin.module#AdminModule'
        },
        { path: '**', redirectTo: '/exchange' }
      ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
