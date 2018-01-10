import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeFormGroup } from './Model/exchangeform.model';
import { RateRepository } from './Model/rate.repository';
import { OrderRepository } from './Model/order.repository';
import { Rate, Crypto } from './Model/crypto.model';
import { Order } from './Model/order.model';
import { routerTransition } from './router.animations';

declare var jQuery: any;

@Component({
    selector: 'app-root',
    moduleId: module.id,
    templateUrl: './exchange.component.html',
    animations: [routerTransition()]
})

export class ExchangeComponent implements AfterViewInit, OnInit, OnDestroy {

    @HostBinding('@routerTransition') role = '';
    exchange_form: ExchangeFormGroup;
    formSubmitted = false;
    timer_id = 0;
    is_visa = false;
    give = 'USD';
    receive = 'BTC';
    input_give = false;
    order_sent = false;
    submitted = false;
    current_order: Order;

    @ViewChild('exchange_form_jquery') formjq: ElementRef;

    constructor(private repository: RateRepository, private order: OrderRepository, private router: Router) {
        this.exchange_form = new ExchangeFormGroup();

        const default_order = new Order ('',
            'EUR',
            (1000).toFixed(2),
            'LTC',
            (1).toFixed(7),
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
        this.current_order =  new Order ('', 'USD', '', 'BTC', '', '', '', '', '', '', '', '', '', '');

        default_order = this.current_order;

        for (const key in default_order) {
            if (default_order.hasOwnProperty(key)) {
                const val = default_order[key];

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
    }

    ngOnInit() {
        this.timer_id = window.setInterval(() => {
            this.refreshCurrencies();
        }, 60000);
    }

    ngOnDestroy() {
        if (this.timer_id) {
            window.clearInterval(this.timer_id);
        }
    }

    ngAfterViewInit() {
        const $form = jQuery(this.formjq.nativeElement);

        jQuery('#f_date', $form).mask('99/99/9999', {placeholder: 'MM/DD/YYYY'});
        jQuery('#card_code', $form).mask('999', {placeholder: '___'});
        jQuery('#f_month', $form).mask('99', {placeholder: 'MM'});
        jQuery('#f_year', $form).mask('99', {placeholder: 'YY'});
        jQuery('#f_phone', $form).mask('+9 (999) 999-99-99', {placeholder: '+X (XXX) XXX-XX-XX'});
        jQuery('#f_serial', $form).mask('9999 9999 9999 9999', {placeholder: '0000 0000 0000 0000'});
    }

    getFormValidationMessages(): {} {
        const form = this.exchange_form;
        const messages = {};
        Object.keys(form.controls).forEach(k => {
            this.exchange_form.getValidationMessages(form.controls[k], k).forEach(m => messages[k] = m);
        });
        return messages;
    }

    submitForm() {
        const form = this.exchange_form;
        for (const key in this.current_order) {
            if (this.current_order.hasOwnProperty(key) && form.value.hasOwnProperty(key)) {
                this.current_order[key] = form.value[key];
            }
        }
        form.formSubmitted = true;
        if (form.valid) {
            this.order.saveOrder(this.current_order).subscribe(result => {
                form.reset();
                this.order_sent = true;
                this.submitted = false;
                if (result.status === 'OK') {
                    this.router.navigate(['/complete']);
                }
            });
            form.formSubmitted = false;
        }
    }

    getRates(): Rate[] {
        return this.repository.getRates();
    }

    refreshCurrencies(): Crypto[] {
        const ret = this.repository.refreshCurrencies();
        this.calcReceive();
        return ret;
    }

    formatCurrency(value: string): string {
        return parseFloat(value).toFixed(2);
    }

    isVisa(): boolean {
        return this.is_visa;
    }

    analyzeSerial(event: KeyboardEvent) {
        const first = (<HTMLTextAreaElement>event.target).value.substr(0, 1);
        this.is_visa = first === '4';
    }

    calcReceive(): boolean {
        const form = this.exchange_form.value;
        const amount_give = parseFloat(form.amount_give);
        if (isNaN(amount_give) || amount_give === 0) {
            return false;
        }
        this.input_give = true;
        const rates = this.getRates();

        const idx = rates.findIndex(e => e.symbol === form.receive );
        const rate = parseFloat(rates[idx]['price_' + form.give.toLowerCase()]);
        const value = amount_give / rate;

        this.exchange_form.controls.amount_receive.setValue (value.toFixed(7));

        return true;
    }

    calcGive(): boolean {
        const form = this.exchange_form.value;
        const amount_receive = parseFloat(form.amount_receive);
        if (isNaN(amount_receive) || amount_receive === 0) {
            return false;
        }
        this.input_give = false;
        const rates = this.getRates();

        const idx = rates.findIndex(e => e.symbol === form.receive );
        const rate = parseFloat(rates[idx]['price_' + form.give.toLowerCase()]);
        const value = amount_receive * rate;
        if (isNaN(value) || value === 0) {
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
