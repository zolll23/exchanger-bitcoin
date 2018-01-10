import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { ExchangeComponent } from './exchange.component';
// import { AppComponent } from './app.component';

import { RateDataSource } from './Model/rate.datasource';
import { StaticDataSource } from './Model/static.datasource';
import { RateRepository } from './Model/rate.repository';
import { RestDataSource } from './Model/rest.datasource';
import { RestStaticDataSource } from './Model/rest_static.datasource';
import { OrderRepository } from './Model/order.repository';

import { ExchangeFormGroup } from './Model/exchangeform.model';
import { Rate, Crypto } from './Model/crypto.model';
import { Order } from './Model/order.model';

declare var jQuery: any;


class MockRouter {
    navigateByUrl(url: string) { return url; }
}
// { provide: APP_BASE_HREF, useValue : '/' }, { provide: Router, useClass: MockRouter }
describe ('ExchangeComponent', function () {

    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
                RouterTestingModule.withRoutes([ { path: '', component: ExchangeComponent } ])
            ],
            declarations: [ ExchangeComponent ],
            providers: [
                RateRepository,
                RateDataSource,
                RestDataSource,
                OrderRepository,
                { provide: APP_BASE_HREF, useValue : '/' },
                { provide: RateDataSource, useClass: StaticDataSource },
                { provide: RestDataSource, useClass: RestStaticDataSource }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ExchangeComponent);
    });

    it('should create the ExchangeComponent', () => { 
         fixture.detectChanges();
         const app = fixture.debugElement.componentInstance;
         expect(app).toBeTruthy();
    });
    

    it('should render h1 tag', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        console.log(compiled.querySelector('h1').textContent);
        expect(compiled.querySelector('h1').textContent).toContain('Buy bitcoins');
    });
});

