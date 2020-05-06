import {AbstractControl} from '@angular/forms'

export function ValidateUpperCase(control: AbstractControl){
    
        let isUpperCase = control.value != "" ? control.value === control.value.toUpperCase() : true;
        if(!isUpperCase)
            return {validateUpperCase: true}
    
    return null
}
