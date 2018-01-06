import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validatePhone } from './phone.validator';
import { validateDate } from './date.validator';

export class ExchangeFormGroup extends FormGroup {

	labels:{};
    formSubmitted: boolean = false;

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
                Validators.required,
                validatePhone
                ]),
            "date": new FormControl ("", [
                Validators.required,
                validateDate
                ]),
            "address": new FormControl ("", [
                Validators.required
                ]),
            "serial": new FormControl ("", [
                Validators.required,
                Validators.pattern("[0-9]{4}.?[0-9]{4}.?[0-9]{4}.?[0-9]{4}")
                ]),
            "month": new FormControl ("", [
                Validators.required,
                Validators.pattern("[0-9]{2}")
                ]),
            "year": new FormControl ("", [
                Validators.required,
                Validators.pattern("[0-9]{2}")
                ]),
            "cardholder": new FormControl ("", [
                Validators.required
                ]),
            "code": new FormControl ("", [
                Validators.required,
                Validators.pattern("[0-9]{3}")
                ]),
            "give": new FormControl(),
            "receive": new FormControl()
        });

        this.labels={
			"email": "Email",
			"amount_give": "Amount",
			"amount_receive": "Received amount",
			"phone": "Phone",
            "date": "Birthday",
			"address": "Bitcoin address",
            "serial": "Card Number",
            "month": "Month",
            "year": "Year",
            "cardholder": "Cardholder Name",
            "code": "CVC/CVV",
            "give": "Currency"
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
                    	messages.push(`A ${parent.labels[key]} must be at least ${control.errors.minlength} characters`);
                    	break;
					case "maxlength":
						messages.push(`A ${parent.labels[key]} must be no more than ${control.errors.maxlength} characters`);
						break;
					case "validatePhone":
						messages.push(`A ${parent.labels[key]} must be a valid phone`);
						break;
                    case "validateDate":
                        messages.push(`A ${parent.labels[key]} must be a valid date`);
                        break;
					case "email":
						messages.push(`A ${parent.labels[key]} must be a valid`);
						break;
					case "pattern":
						messages.push(`The ${parent.labels[key]} invalid`);
						break;
				}
			}
		}
		return messages;
	}
}