import { Injectable } from "@angular/core";
import { Http, Request, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = 3000;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    
    constructor(private http: Http) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }
        
    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Post, "orders", order);
    }
    
    private sendRequest(verb: RequestMethod, url: string, body?: Order): Observable<Order> {
        console.log(verb);
        let req = new Request({
            method: verb,
            url: this.baseUrl + url,
            body: body
        });
        
        console.log('req.method:', RequestMethod[req.method]); // Post
        console.log('req.url:', req.url); // https://google.com
        return this.http.request(req).map(response => response.json());
    }
}