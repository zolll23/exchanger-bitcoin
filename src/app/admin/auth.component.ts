import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Model/auth.service';

declare var jQuery: any;

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: [ './../../assets/admin.css' ]
})

export class AuthComponent implements AfterViewInit {
    public login: string;
    public password: string;
    public errorMessage: string;
    private loginFormGroup: FormGroup;

    ngAfterViewInit() {
        jQuery(document).ready(function() { jQuery('body').bootstrapMaterialDesign(); });
    }

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
                    this.auth.token = response.success ? response.token : null ;
                    if (this.auth.authenticated) {
                        this.router.navigateByUrl('/admin/main');
                    } else {
                        this.errorMessage = 'Authentication Failed';
                    }
                } else {
                    console.log('Get auth data is failed');
                    this.auth.token = null;
                }
            });
        } else {
            this.errorMessage = 'Form Data Invalid';
        }
    }
}
