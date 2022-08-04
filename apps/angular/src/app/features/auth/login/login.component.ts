import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/auth/login';

import { UserService } from '../../../../core/services/';

@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
  ) {}

  public loginForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  public ngOnInit(): void {}

  public submitForm(): void {
    this.userService
      .login(this.loginForm.value as Login)
      .subscribe();
  }

  public logout(): void {
    this.userService.logout();
  }
}
