import { FormControl } from '@angular/forms';


export function validatePhone(c: FormControl) {
	let PHONE_REGEXP = /^\+\d+(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{2}(-|\s)\d{2}$/;

	console.log(PHONE_REGEXP);
	console.log(c);

	return PHONE_REGEXP.test(c.value) ? null : {
		validatePhone: {
			valid: false
		}
	};
}