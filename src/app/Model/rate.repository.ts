// rate.repository.ts

import { Injectable } from "@angular/core";
import { Crypto } from "./crypto.model";
import { RateDataSource } from "./rate.datasource";

@Injectable()
export class RateRepository {

	private currencies: Crypto[] = [];

	constructor (private dataSource: RateDataSource) {
		this.dataSource = dataSource;
		this.currencies = dataSource.getCurrencies();
	}

	refreshCurrencies():Crypto[] {
		this.currencies = this.dataSource.getCurrencies();
		/*currencies.sort(function (a,b) {
			console.log('===========');
			console.log(a);
			if (a.id<b.id) return -1;
			if (a.id>b.id) return 1;
			return 0;
		});*/
		return this.getCurrencies();
	}

	getCurrencies():Crypto[] {
		return this.currencies;
	}

	getCurrency(id: string): Crypto {
		return this.currencies.find( c => c.id == id);
	}
}