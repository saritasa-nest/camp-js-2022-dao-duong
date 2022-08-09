import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/auth/login';

import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorService, AuthService, NavigateService } from '../../../../core/services/';

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
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly navigateService: NavigateService,
    private readonly errorService: ErrorService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
  ) {}

  /** Login form controls. */
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /** Handle form submission. */
  public submitForm(): void {
    this.authService
      .login(this.loginForm.value as Login)
      .pipe(
        tap(() => this.navigateService.navigateToHome()),
        catchError((error: unknown) => of(this.handleError(error))),
        takeUntil(this.subscriptionDestroyed$),
      )
      .subscribe();
  }

  /**
   * Handle error from server.
   * @param error Error from server.
   */
  private handleError(error: unknown): void {
    const errorData = this.errorService.getError(error);
    this.errorService.showErrorToForm(errorData, this.loginForm);
    this.changeDetectorRef.markForCheck();
    this.errorService.openErrorDetailSnackBar(errorData, this.snackBar);
  }

  /** On destroy lifecycle hook. */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
