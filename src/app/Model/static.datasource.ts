// static.datasource.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Crypto, Rate } from './crypto.model';
import 'rxjs/add/observable/from';

@Injectable()
export class StaticDataSource {
    rates: Rate[] = [
            new Rate('bitcoin', '17000', '15000', 'BTC', 'Bitcoin'),
            new Rate('ethereum', '900', '750', 'ETH', 'Etherium'),
            new Rate('litecoin', '300', '250', 'LTC', 'Litecoin')
    ];

    getCurrencies(): Crypto[] {
        const info: Crypto[] = [];
        for (const c in this.rates) {
            if (this.rates.hasOwnProperty(c)) {
                const rate = this.rates[c];
                this.getCurrency(rate.id).subscribe(data => {});
            }
        }
        return info;
    }

    getRates(): Rate[] {
        return this.rates;
    }

    getCurrency(currency: string): Observable<any> {
        return Observable.from([this.rates]);
    }

}
