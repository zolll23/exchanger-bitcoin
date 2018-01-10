import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExchangeComponent } from './exchange.component';
import { InfoComponent } from './info.component';
import { Router } from '@angular/router';


class MockRouter {
    navigateByUrl(url: string) { return url; }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
            FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
                { path: 'exchange', component: ExchangeComponent },
                { path: 'terms', component: InfoComponent },
                { path: 'privacy', component: InfoComponent },
                { path: 'faq', component: InfoComponent },
                { path: 'complete', component: InfoComponent },
                {
                    path: 'admin',
                    loadChildren: 'app/admin/admin.module#AdminModule'
                },
                { path: '**', redirectTo: '/exchange' }
                ])
            ],
            declarations: [
                AppComponent, ExchangeComponent, InfoComponent
            ],
            providers: [
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();
    }));

    it('should create the AppComponent', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'bitcoinbycard'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('bitcoinbycard');
    }));

    it('should render router-outlet tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    }));



    /*it('should determine Rate object', function() {

        expect(component).toBeDefined();
    });*/
});
