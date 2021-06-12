import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() errors: ValidationErrors;

  get error(): string {
    return this.errors ? this.errorText[Object.keys(this.errors)[0]] : "";
  }

  constructor() { }

  ngOnInit(): void {
  }

  errorText: {[key: string]: string} = {       
    "required" : "Pole wymagane",
    "minlength" : "Min 3 znaki"
    }   
}
