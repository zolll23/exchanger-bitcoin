import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Info } from "./info.model";
import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = 3000;


@Injectable() 
export class InfoDataSource {
	
	baseUrl: string;
	info: Info;

	constructor(private http: Http) {
		this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/public`;
		this.info = new Info(200,'loading...');
	}

	loadInfo(url:string):Info {
			this.sendRequest(RequestMethod.Get, `${url}`).subscribe(data => {
				this.info = data;
			});
		return this.info;
	}

	getInfo():Info {
		return this.info;
	}

	private sendRequest(verb: RequestMethod, url: string, body ?: Object):Observable<Info> {
		return this.http.request(new Request({
			method: verb,
			url: this.baseUrl + url,
			body: body
		})).map( response => response.json() );
	}


}