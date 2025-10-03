import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import {
  NgForm,
  FormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNativeDateAdapter()],

  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  // Reactive Form
  form: FormGroup;

  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dob: ['', [Validators.required, this.minimumAgeValidator(18)]],
      terms: [false, Validators.requiredTrue],
    });
    this.form.setValidators(this.matchPasswordsValidator());

    // Trigger confirmPassword validation on password changes
    this.form.get('password')!.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')!.updateValueAndValidity();
    });
  }
  // Validator to compare password and confirmPassword
  matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPasswordControl = group.get('confirmPassword');

      if (!password || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        // If confirmPassword already has other errors, don't overwrite them
        return null;
      }

      if (password !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null; // always return null for group validator
    };
  }

  // Custom validator: minimum age based on DOB
  minimumAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dob = control.value;
      if (!dob) return null; // don't validate empty value here (handled by required)
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= minAge
        ? null
        : { tooYoung: { requiredAge: minAge, actualAge: age } };
    };
  }
  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
  get dob() {
    return this.form.get('dob')!;
  }

  get terms() {
    return this.form.get('terms')!;
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted ✅', this.form.value);
      // Reset form or send to backend
    }
  }
}
