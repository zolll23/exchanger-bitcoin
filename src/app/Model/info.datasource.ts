import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Info } from './info.model';

const PROTOCOL = 'http';
const PORT = 3000;


@Injectable()
export class InfoDataSource {

    baseUrl: string;
    info: Info;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/public`;
        this.info = new Info(200, 'loading...');
    }

    loadInfo(url: string): Info {
            this.sendRequest(`${url}`).subscribe(data => {
                this.info = data;
            });
        return this.info;
    }

    getInfo(): Info {
        return this.info;
    }

    private sendRequest( url: string, body ?: Object): Observable<Info> {
        return this.http.get<Info>(this.baseUrl + url);
    }
}
