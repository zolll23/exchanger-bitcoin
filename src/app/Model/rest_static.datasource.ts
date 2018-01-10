import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from './order.model';
import 'rxjs/add/observable/from';


@Injectable()
export class RestStaticDataSource {

    order: Order = new Order ('',
            'EUR',
            (1000).toFixed(2),
            'LTC',
            (1).toFixed(7),
            'adam.smith@google.com',
            '+1 (800) 555-55-55',
            '01/01/1970',
            'aabbccddeeFF010102030405',
            '4555 1234 1234 5678',
            '11',
            '19',
            '111',
            'ADAM SMITH'
        );

    saveOrder(order: Order): Observable<any> {
        return this.sendRequest('orders', order);
    }

    private sendRequest(url: string, body ?: Object): Observable<Order> {
        return Observable.from([this.order]);
    }
}
