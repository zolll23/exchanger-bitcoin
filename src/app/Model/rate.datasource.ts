// rate.datasource.ts

import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Crypto } from "./crypto.model";
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";

const PROTOCOL = "https";


@Injectable() 
export class RateDataSource {
	
	baseUrl: string;
	currencies:string[];
	currencyURL:string;

	constructor(private http: Http) {
		this.baseUrl = `${PROTOCOL}://api.coinmarketcap.com//v1/ticker/`;
		this.currencies = ['bitcoin','ethereum','litecoin'];
		this.currencyURL = "?convert=EUR";
	}

	getCurrencies():Crypto[] {
		let info: Crypto[] = [];
		for (let c in this.currencies) {
			this.getCurrency(this.currencies[c]).subscribe(data => {
				info.push(data.pop());
			});
		}
		console.log(info);
		return info;
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