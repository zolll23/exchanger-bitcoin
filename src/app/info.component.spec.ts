import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { InfoComponent } from './info.component';

import { InfoDataSource } from './Model/info.datasource';
import { InfoStaticDataSource } from './Model/info_static.datasource';
import { InfoRepository } from './Model/info.repository';

import { Info } from './Model/info.model';

declare var jQuery: any;


class MockRouter {
    navigateByUrl(url: string) { return url; }
}
// { provide: APP_BASE_HREF, useValue : '/' }, { provide: Router, useClass: MockRouter }
describe ('ExchangeComponent', function () {

    let fixture: ComponentFixture<InfoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
                RouterTestingModule.withRoutes([ { path: '', component: InfoComponent } ])
            ],
            declarations: [ InfoComponent ],
            providers: [
                InfoRepository,
                InfoDataSource,
                InfoStaticDataSource,
                { provide: APP_BASE_HREF, useValue : '/' },
                { provide: InfoDataSource, useClass: InfoStaticDataSource }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InfoComponent);
    });

    it('should create the InfoComponent', () => {
         fixture.detectChanges();
         const app = fixture.debugElement.componentInstance;
         expect(app).toBeTruthy();
    });

    it('should get Info from mock datasource', () => {
        fixture.detectChanges();
        const app = fixture.debugElement.componentInstance;
        expect(app.getInfo().text).toBeDefined();
    });

});
