// rate.repository.ts

import { Injectable } from "@angular/core";
import { Crypto } from "./crypto.model";
import { RateDataSource } from "./rate.datasource";

@Injectable()
export class RateRepository {

	private currencies: Crypto[] = [];
	private rates: Rate[];

	constructor (private dataSource: RateDataSource) {
		this.dataSource = dataSource;
		this.currencies = dataSource.getCurrencies();
		this.rates = dataSource.getRates();
	}

	refreshCurrencies():Crypto[] {
		this.currencies = this.dataSource.getCurrencies();
		this.rates = this.dataSource.getRates();
		return this.getCurrencies();
	}

	getCurrencies():Crypto[] {
		return this.currencies;
	}

	getCurrency(id: string): Crypto {
		return this.currencies.find( c => c.id == id);
	}

	getRates():Rate[] {
		return this.rates;
	}
}