import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "auth.component.html",
    styleUrls: ['./admin.css']
})

export class AuthComponent {
    public username: string;
    public password: string;
    public errorMessage: string;
    private loginFormGroup: FormGroup;

    constructor(private router: Router) {
    	this.loginFormGroup = new FormGroup({
  			"login": new FormControl(),
  			"password": new FormControl()
  		});
    }

    authenticate(form: NgForm) {
    	if (form.valid) {
    		this.router.navigateByUrl("/admin/main");
    	} else {
    		this.errorMessage = "Form Data Invalid";
    	}
    }
}