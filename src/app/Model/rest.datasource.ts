import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from './order.model';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(login: string, password: string): Observable<any> {
        return this.http.post(this.baseUrl + 'login', { login: login, password: password } );
    }

    saveOrder(order: Order): Observable<any> {
        return this.sendRequest('orders', order);
    }

    private sendRequest( url: string, body?: Order ): Observable<any> {
        return this.http.post(this.baseUrl + url, body);
    }
}
