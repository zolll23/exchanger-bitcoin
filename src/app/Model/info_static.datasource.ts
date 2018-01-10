// static.datasource.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Info } from './info.model';
import 'rxjs/add/observable/from';


@Injectable()
export class InfoStaticDataSource {

    baseUrl: string;
    info: Info = new Info (200, 'Default test page');

    loadInfo(url: string): Info {
            this.sendRequest('localhost').subscribe(data => {
                this.info = data;
            });
        return this.info;
    }

    getInfo(): Info {
        return this.info;
    }

    private sendRequest( url: string, body ?: Object): Observable<Info> {
        return Observable.from([this.info]);
    }
}
