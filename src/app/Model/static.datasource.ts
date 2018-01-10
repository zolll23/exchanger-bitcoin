// static.datasource.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Crypto, Rate } from './crypto.model';
import 'rxjs/add/observable/from';

@Injectable()
export class StaticDataSource {
    rates: Rate[] = [
            new Rate('bitcoin', '17000', '15000', 'BTC', 'Bitcoin'),
            new Rate('ethereum', '900', '750', 'ETH', 'Ethereum'),
            new Rate('litecoin', '300', '250', 'LTC', 'Litecoin')
    ];

    currencies: Crypto[] = [
        new Crypto('bitcoin', 'Bitcoin', 'BTC', '', '12000', '1', '', '', '', '', '', '', '', '', '10000', ''),
        new Crypto('ethereum', 'Ethereum', 'ETH', '', '1200', '0.01', '', '', '', '', '', '', '', '', '1000', ''),
        new Crypto('litecoin', 'Litecoin', 'LTC', '', '500', '0.005', '', '', '', '', '', '', '', '', '350', '')
    ];

    getCurrencies(): Crypto[] {
        const info: Crypto[] = [];
        for (const c in this.rates) {
            if (this.rates.hasOwnProperty(c)) {
                const rate = this.rates[c];
                this.getCurrency(rate.id).subscribe(data => {
                    info.push(data);
                });
            }
        }
        return info;
    }

    getRates(): Rate[] {
        return this.rates;
    }

    getCurrency(id: string): Observable<Crypto> {
        const data = this.currencies.find( c => c.id === id);
        return Observable.from([data]);
    }

}
