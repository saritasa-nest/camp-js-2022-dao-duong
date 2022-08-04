import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@js-camp/core/models/auth/register';
import { HttpError } from '@js-camp/core/models/httpError';

import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';

import { UserService, UrlService } from '../../../../core/services/';

/** Register component. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  private readonly subscribtionDestroyed$: Subject<boolean> = new Subject();

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly urlService: UrlService,
  ) {}

  /** Register form controls. */
  public readonly registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  /** Handle form submission. */
  public submitForm(): void {
    this.userService
      .register(this.registerForm.value as Register)
      .pipe(
        tap(() => this.urlService.navigateToHome()),
        catchError((error: unknown) => {
          if (error instanceof HttpError) {
            console.log(error);
          }
          return throwError(() => error);
        }),
        takeUntil(this.subscribtionDestroyed$),
      )
      .subscribe();
  }

  /** Handle logout. */
  public logout(): void {
    this.userService.logout();
  }

  /**
   * Validate password confirmation.
   * @param password Password value.
   * @param confirmPassword Password confirmation value.
   */
  public validateConfirmPassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  /** On destroy lifecycle hook. */
  public ngOnDestroy(): void {
    this.subscribtionDestroyed$.next(true);
    this.subscribtionDestroyed$.complete();
  }
}
