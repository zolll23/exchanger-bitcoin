// rate.datasource.ts

import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Crypto, Rate } from "./crypto.model";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

const PROTOCOL = "https";



@Injectable() 
export class RateDataSource {
	
	baseUrl: string;
	rates:Rate[];
	currencyURL:string;

	constructor(private http: Http) {
		this.baseUrl = `${PROTOCOL}://api.coinmarketcap.com//v1/ticker/`;
		this.rates = [
			new Rate('bitcoin','','','BTC','Bitcoin'),
			new Rate('ethereum','','','ETH','Etherium'),
			new Rate('litecoin','','','LTC','Litecoin')
		];
		this.currencyURL = "?convert=EUR";
	}

	getCurrencies():Crypto[] {
		let info: Crypto[] = [];
		for (let c in this.rates) {
			let rate=this.rates[c];
			this.getCurrency(rate.id).subscribe(data => {
				let d = data.pop();
				info.push(d);
				// Find index in rates by id currency
				let idx = this.rates.findIndex(e => e.id==d.id );
				this.rates[idx].price_usd = d.price_usd;
				this.rates[idx].price_eur = d.price_eur;
			});
		}
		return info;
	}

	getRates():Rate[] {
		return this.rates;
	}

	getCurrency(currency:string): Observable<any> {
		return this.sendRequest(RequestMethod.Get, `${currency}/${this.currencyURL}`);
	}

	private sendRequest(verb: RequestMethod,
		url: string,
		body ?: Object):Observable<Crypto> {
		return this.http.request(new Request({
			method: verb,
			url: this.baseUrl + url,
			body: body
		})).map( response => response.json() );
	}


}