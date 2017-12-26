import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validatePhone } from '../phone.validator';

export class ExchangeFormGroup extends FormGroup {

	labels:{};	

	constructor() {
        super({
        	"email": new FormControl ("", [
    			Validators.required,
    			Validators.email
    			]),
    		"amount_give": new FormControl ("", [
    			Validators.required
    			]),
			"amount_receive": new FormControl ("", [
    			Validators.required
    			]),
            "phone": new FormControl ("", [
                Validators.required
                ]),
            "date": new FormControl ("", [
                Validators.required
                ])
        });

        this.labels={
			"email": "Email",
			"amount_give": "Amount",
			"amount_receive": "Received amount",
			"phone": "Phone",
			"date": "Birthday"
        };
    }

	getValidationMessages(control,key):string[] {
    	let messages: string[] = [];
    	let parent = control._parent;
    	if (control.errors) {
        	for (let errorName in control.errors) {
            	switch (errorName) {
                	case "required":
                    	messages.push(`You must enter a ${parent.labels[key]}`);
                    	break;
                	case "minlength":
                    	messages.push(`A ${parent.labels[key]} must be at least
                        ${this.errors['minlength'].requiredLength} characters`);
                    	break;
					case "maxlength":
						messages.push(`A ${parent.labels[key]} must be no more than
    					${this.errors['maxlength'].requiredLength} characters`);
						break;
					case "phone":
						messages.push(`A ${parent.labels[key]} must be a valid phone`);
						break;
					case "email":
						messages.push(`A ${parent.labels[key]} must be a valid email address`);
						break;
					case "pattern":
						messages.push(`The ${parent.labels[key]} contains illegal characters`);
						break;
				}
			}
		}
		return messages;
	}
}