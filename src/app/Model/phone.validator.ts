import { FormControl } from '@angular/forms';


export function validatePhone(c: FormControl) {
	let PHONE_REGEXP = /^\+\d+\s?(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{2}(-|\s)\d{2}$/;

	return PHONE_REGEXP.test(c.value) ? null : {
		validatePhone: {
			valid: false
		}
	};
}