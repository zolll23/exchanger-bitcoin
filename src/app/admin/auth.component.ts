import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Model/auth.service';

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: ['./admin.css']
})

export class AuthComponent {
    public login: string;
    public password: string;
    public errorMessage: string;
    private loginFormGroup: FormGroup;

    constructor(private router: Router, private auth: AuthService) {
        this.loginFormGroup = new FormGroup({
            'login': new FormControl(),
            'password': new FormControl()
        });
    }

    authenticate(form: NgForm) {
        if (form.valid) {
            this.auth.authenticate(this.login, this.password).subscribe(response => {
                if (response) {
                    this.auth.authenticated = response.success ? response.token : null ;
                    if (this.auth.authenticated) {
                        this.router.navigateByUrl('/admin/main');
                    } else {
                        this.errorMessage = 'Authentication Failed';
                    }
                } else {
                    console.log('Get auth data is failed');
                    this.auth.authenticated = null;
                }
            });
        } else {
            this.errorMessage = 'Form Data Invalid';
        }
    }
}
