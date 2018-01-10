import { FormControl } from '@angular/forms';


export function validateDate(c: FormControl) {
    const DATE_REGEXP = /^\d{2}\/\d{2}\/\d{4}$/;
    let valid = false;

    if (!DATE_REGEXP.test(c.value)) {
        return { validateDate: {valid: false} };
    }

    const parts: string[] = c.value.split('/');

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if ( month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 ) {
        valid = true;
    }

    return valid ? null : {
        validateDate: {
            valid: false
        }
    };
}
