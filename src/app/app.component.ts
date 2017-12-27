import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ExchangeFormGroup } from './Model/exchangeform.model';
import { RateRepository } from "./Model/rate.repository";
import { Crypto } from "./Model/crypto.model";

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
    title = 'app';
    exchange_form : ExchangeFormGroup;
    formSubmitted: boolean = false;
    timer_id:number = 0;

    @ViewChild("exchange_form_jquery") formjq: ElementRef;

    constructor(private repository: RateRepository) {
    	this.exchange_form = new ExchangeFormGroup();
    }

    ngOnInit() {
        this.timer_id = setInterval(() => {
            //this.refreshCurrencies(); 
        }, 60000);
    }

    ngOnDestroy() {
        if (this.timer_id) {
            clearInterval(this.timer_id);
        }
    }

    ngAfterViewInit() {
    	let $form = jQuery(this.formjq.nativeElement);
    	
    	jQuery("#f_date",$form).mask("99/99/9999",{placeholder:"MM/DD/YYYY"});
    	jQuery("#card_code",$form).mask("999",{placeholder:"___"});
    	jQuery("#f_month",$form).mask("99",{placeholder:"MM"});
    	jQuery("#f_year",$form).mask("99",{placeholder:"YY"});
    	jQuery("#f_phone",$form).mask("+9 (999) 999-99-99",{placeholder:"+X (XXX) XXX-XX-XX"});
    	jQuery("#f_serial",$form).mask("9999 9999 9999 9999",{placeholder:"0000 0000 0000 0000"});
    }

    getFormValidationMessages(): {} {
        let form=this.exchange_form;
        let messages = {};
        Object.keys(form.controls).forEach(k => {
            this.exchange_form.getValidationMessages(form.controls[k], k).forEach(m => messages[k]=m);
        });
        return messages;
    }

    submitForm() {
        let form=this.exchange_form;
        form.formSubmitted = true;
        if (form.valid) {
            console.log(form);
            form.reset();
            form.formSubmitted = false;
        }
    }

    getCurrencies(): Crypto[] {
        return this.repository.getCurrencies();
    }

    refreshCurrencies(): Crypto[] {
        return this.repository.refreshCurrencies();
    }

    formatCurrency(value:string):string {
        return parseFloat(value).toFixed(2);
    }
}
