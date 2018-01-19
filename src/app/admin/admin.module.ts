// admin.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../Model/auth.service';
import { RestDataSource } from '../Model/rest.datasource';
import { AuthGuard } from './auth.guard';

import { MatButtonModule,
 MatCheckboxModule,
 MatInputModule,
 MatFormFieldModule,
 MatDatepickerModule,
 MatNativeDateModule,
 MatExpansionModule,
 MatCardModule,
 MatToolbarModule,
 MatStepperModule } from '@angular/material';


import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin.component';

const routing = RouterModule.forChild([
    { path: 'auth', component: AuthComponent },
    { path: 'main', component: AdminComponent },
    //{ path: 'main', component: AdminComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'auth' }
]);
@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    routing,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatStepperModule
    ],
    declarations: [AuthComponent, AdminComponent],
    providers: [ AuthService, AuthGuard ]
})

export class AdminModule { }
