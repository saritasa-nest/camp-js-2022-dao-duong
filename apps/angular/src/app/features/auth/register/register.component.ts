import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@js-camp/core/models/auth/register';

import { UserService } from '../../../../core/services/';

/** Register component. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
  ) {}

  /** Register form controls. */
  public readonly registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  /** Handle form submission. */
  public submitForm(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this.userService
      .register(this.registerForm.value as Register)
      .subscribe();
  }

  /** Handle logout. */
  public logout(): void {
    this.userService.logout();
  }
}
