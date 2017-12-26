import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
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
    exchange_form : FormGroup;
    @ViewChild("exchange_form_jquery") form: ElementRef;

    constructor() {
    	this.exchange_form = new FormGroup ({
    		"email": new FormControl ("", [
    			Validators.required,
    			Validators.email
    			]),
    		"amount_give": new FormControl ("", [
    			Validators.required
    			]),
			"amount_receive": new FormControl ("", [
    			Validators.required
    			])

    	});
    }

    ngAfterViewInit() {
    	let $form = jQuery(this.form.nativeElement);
    	
    	jQuery("#f_date",$form).mask("99/99/9999",{placeholder:"MM/DD/YYYY"});
    	jQuery("#card_code",$form).mask("999",{placeholder:"___"});
    	jQuery("#f_month",$form).mask("99",{placeholder:"MM"});
    	jQuery("#f_year",$form).mask("99",{placeholder:"YY"});
    	jQuery("#f_phone",$form).mask("+9(999)999-99-99",{placeholder:"+X(XXX)XXX-XX-XX"});
    	jQuery("#f_serial",$form).mask("9999 9999 9999 9999",{placeholder:"0000 0000 0000 0000"});
    }

    submit(){
        console.log(this.exchange_form);
    }
}
