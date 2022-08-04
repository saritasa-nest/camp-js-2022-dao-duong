import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/auth/login';

import { UserService } from '../../../../core/services/';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
  ) {}

  /** Login form controls. */
  public loginForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  /** Handle form submission. */
  public submitForm(): void {
    if (!this.loginForm.errors) {
      this.userService
        .login(this.loginForm.value as Login)
        .subscribe();
    }
  }

  /** Handle logout. */
  public logout(): void {
    this.userService.logout();
  }
}
