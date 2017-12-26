import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ExchangeFormGroup } from './Model/exchangeform.model';

//declare var $:JQueryStatic;
//import * as jQuery from 'jquery';
//declare var jQuery: jQuery;
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

    @ViewChild("exchange_form_jquery") formjq: ElementRef;




    constructor() {
    	this.exchange_form = new ExchangeFormGroup();
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

    getFormValidationMessages(): string[] {
        let form=this.exchange_form;
        console.log(form);
        let messages: string[] = [];
        Object.keys(form.controls).forEach(k => {
            this.exchange_form.getValidationMessages(form.controls[k], k).forEach(m => messages.push(m));
        });
        return messages;
    }


    submitForm() {
        let form=this.exchange_form;
        this.formSubmitted = true;
        if (form.valid) {
            console.log(form);
            form.reset();
            this.formSubmitted = false;
        }
    }
}
