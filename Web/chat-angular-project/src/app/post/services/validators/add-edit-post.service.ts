import { Injectable } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AddEditServiceValidator {
  
    setFormValidators (form: FormGroup) {
        form.get('title').setValidators([Validators.required, Validators.minLength(3)]);
        form.get('text').setValidators(Validators.required);
    }
}
