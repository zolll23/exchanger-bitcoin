import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ExchangeFormGroup } from './Model/exchangeform.model';
import { RateRepository } from "./Model/rate.repository";
import { OrderRepository } from "./Model/order.repository";
import { Rate, Crypto } from "./Model/crypto.model";
import { Order } from "./Model/order.model"
import { routerTransition } from './router.animations';

declare var jQuery: any;

@Component({
    selector: 'app-root',
    moduleId: module.id,
    templateUrl: './exchange.component.html',
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class ExchangeComponent implements AfterViewInit {
    
    exchange_form : ExchangeFormGroup;
    formSubmitted: boolean = false;
    timer_id:number = 0;
    is_visa:boolean = false;
    give:string = 'USD';
    receive:string = 'BTC';
    input_give: boolean = false;
    order_sent: boolean = false;
    submitted: boolean = false;
    current_order:Order;

    @ViewChild("exchange_form_jquery") formjq: ElementRef;

    constructor(private repository: RateRepository, private order:OrderRepository, private router: Router) {
    	this.exchange_form = new ExchangeFormGroup();

        let default_order = new Order ('',
            'EUR',
            (new Number(10000)).toFixed(2),
            'LTC',
            (new Number(1)).toFixed(7),
            'adam.smith@google.com',
            '+1 (800) 555-55-55',
            '01/01/1970',
            'aabbccddeeFF010102030405',
            '4555 1234 1234 5678',
            '11',
            '19',
            '111',
            'ADAM SMITH'
        );
        this.current_order = default_order;

        for (let key in default_order) {
            let val = default_order[key];
            
            if (this.exchange_form.controls[key]) {
                this.exchange_form.controls[key].setValue (val);
                switch (key) {
                    case 'give':
                    this.give = val;
                    break;
                    case 'receive':
                    this.receive = val;
                    break;
                }
            }
        }
        
    }

    ngOnInit() {
        this.timer_id = setInterval(() => {
            this.refreshCurrencies(); 
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
        //console.log(form);
        form.formSubmitted = true;
        if (form.valid) {
            let result = this.order.saveOrder(this.current_order).subscribe(result => {
                form.reset();
                this.order_sent = true;
                this.submitted = false;
                if (result.status == 'OK') {
                    this.router.navigate(['/complete']);
                }
            });
            console.log('--- result ----');
            console.log(result);
            console.log(form);
            form.formSubmitted = false;
        }
    }

    getRates(): Rate[] {
        return this.repository.getRates();
    }

    refreshCurrencies(): Crypto[] {
        let ret = this.repository.refreshCurrencies();
        this.calcReceive();
        return ret;
    }

    formatCurrency(value:string):string {
        return parseFloat(value).toFixed(2);
    }

    isVisa():boolean {
        return this.is_visa;
    }

    analyzeSerial(event:KeyboardEvent) {
        let first = (<HTMLTextAreaElement>event.target).value.substr(0,1);
        this.is_visa = first == '4';
    }

    calcReceive():boolean {
        let form=this.exchange_form.value;
        let amount_give = parseFloat(form.amount_give);
        if (isNaN(amount_give) || amount_give == 0) return false;
        this.input_give = true;
        let rates=this.getRates();

        let idx = rates.findIndex(e => e.symbol==form.receive );
        let rate = parseFloat(rates[idx]['price_'+form.give.toLowerCase()]);
        let value = amount_give/rate;

        this.exchange_form.controls.amount_receive.setValue (value.toFixed(7));

        return true;
    }

    calcGive():boolean {
        let form=this.exchange_form.value;
        let amount_receive = parseFloat(form.amount_receive);
        if (isNaN(amount_receive) || amount_receive == 0) {
            return false;
        }
        this.input_give = false;
        let rates=this.getRates();

        let idx = rates.findIndex(e => e.symbol==form.receive );
        let rate = parseFloat(rates[idx]['price_'+form.give.toLowerCase()]);
        let value = amount_receive * rate;
        if (isNaN(value) || value == 0) {
            return false;
        }
        this.exchange_form.controls.amount_give.setValue( value.toFixed(2) );
        
        return true;
    }


    setSelect(sel) {
        this[sel] = this.exchange_form.controls[sel].value;
        if (this.input_give) {
            this.calcReceive();
        } else {
            this.calcGive();
        }
    }
}
