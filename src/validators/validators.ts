import { FormControl, FormGroup } from '@angular/forms';
/*
  Custom validators to use everywhere.
*/

// SINGLE FIELD VALIDATORS
export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }else{
    
  }
}

export function ngEmailValidator(email: string): {[key: string]: any} {
  var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!(email && !emailRegexp.test(email))) {
    return { invalidEmail: false };
  }else{
    return { invalidEmail: true };
  }
}


// FORM GROUP VALIDATORS
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

// FORM GROUP VALIDATORS
export function matchingInput(input1: string, input2: string, input3: string, input4: string, input5: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let firstInput = group.controls[input1];
    let secondInput = group.controls[input2];
    let thirdInput = group.controls[input3];
    let fourthInput = group.controls[input4];
    let fifthInput = group.controls[input5];
    
    if (
      firstInput.value === secondInput.value ||
      firstInput.value === thirdInput.value ||
      firstInput.value === fourthInput.value ||
      firstInput.value === fifthInput.value ||
      secondInput.value === thirdInput.value ||
      secondInput.value === fourthInput.value ||
      secondInput.value === fifthInput.value ||
      thirdInput.value === fourthInput.value ||
      thirdInput.value === fifthInput.value ||
      fourthInput.value === fifthInput.value
      ) {
      return {
        inputMatched: true
      };
    }
  }
}

