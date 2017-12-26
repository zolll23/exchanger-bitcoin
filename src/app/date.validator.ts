import { FormControl } from '@angular/forms';


export function validateDate(c: FormControl) {
	let DATE_REGEXP = /^\d{2}\/\d{2}\/\d{4}$/;
	let valid: boolean = false;

	if (!DATE_REGEXP.test(c.value)) return { validateDate: {valid: false} };

	let parts:string[]=c.value.split('/');

	let month = parseInt(parts[0]);
	let day = parseInt(parts[1]);
	let year = parseInt(parts[2]);

	if ( month>=1 && month <= 12 && day>=1 && day<=31 && year >=1900 ) {
		valid = true;
	} 

	return valid ? null : {
		validateDate: {
			valid: false
		}
	};
}