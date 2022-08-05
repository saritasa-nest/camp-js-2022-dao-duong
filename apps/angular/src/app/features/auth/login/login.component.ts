import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/auth/login';

import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';

import { UrlService } from '../../../../core/services/url.service';

import { UserService } from '../../../../core/services/';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  // Rename this please!!!
  private readonly subscriptionDestroyed$: Subject<boolean> = new Subject();

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly urlService: UrlService,
  ) {}

  /** Login form controls. */
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /** Handle form submission. */
  public submitForm(): void {
    this.userService
      .login(this.loginForm.value as Login)
      .pipe(
        tap(() => this.urlService.navigateToHome()),
        catchError((error: unknown) => {
          console.log(error);
          return throwError(() => error);
        }),
        takeUntil(this.subscriptionDestroyed$),
      )
      .subscribe();
  }

  /** On destroy lifecycle hook. */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
