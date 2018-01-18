import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class AuthService {

    auth_token: string;

    constructor(private datasource: RestDataSource) {}
    authenticate(username: string, password: string): Observable<any> {
        return this.datasource.authenticate(username, password);
    }

    get authenticated(): boolean {
        return this.auth_token != null;
}
    clear() {
        this.auth_token = null;
    }

    set token(token: string) {
        this.auth_token = token;
    }
}
