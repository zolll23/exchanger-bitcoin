// rate.datasource.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Crypto, Rate } from './crypto.model';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

const PROTOCOL = 'https';

@Injectable()
export class RateDataSource {

    baseUrl: string;
    rates: Rate[];
    currencyURL: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://api.coinmarketcap.com//v1/ticker/`;
        this.rates = [
            new Rate('bitcoin', '', '', 'BTC', 'Bitcoin'),
            new Rate('ethereum', '', '', 'ETH', 'Etherium'),
            new Rate('litecoin', '', '', 'LTC', 'Litecoin')
        ];
        this.currencyURL = '?convert=EUR';
    }

    getCurrencies(): Crypto[] {
        const info: Crypto[] = [];
        for (const c in this.rates) {
            if (this.rates.hasOwnProperty(c)) {
                const rate = this.rates[c];
                this.getCurrency(rate.id).subscribe(data => {
                    const d = data.pop();
                    info.push(d);
                    // Find index in rates by id currency
                    const idx = this.rates.findIndex(e => e.id === d.id );
                    this.rates[idx].price_usd = d.price_usd;
                    this.rates[idx].price_eur = d.price_eur;
                });
            }
        }
        return info;
    }

    getRates(): Rate[] {
        return this.rates;
    }

    getCurrency(currency: string): Observable<any> {
        return this.sendRequest(`${currency}/${this.currencyURL}`);
    }

    private sendRequest(url: string): Observable<Crypto> {
        return this.http.get<Crypto>(this.baseUrl + url);
    }
}
