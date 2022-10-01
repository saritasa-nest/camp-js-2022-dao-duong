import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '@js-camp/core/models/auth/login';

import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import {
  ErrorService,
  AuthService,
} from '../../../../core/services/';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private readonly subscriptionDestroyed$: Subject<boolean> = new Subject();

  /** Login form group. */
  public readonly loginForm: FormGroup;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly errorService: ErrorService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
    formBuilder: FormBuilder,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /** Handle form submission. */
  public onFormSubmit(): void {
    this.authService
      .login(this.loginForm.value as Login)
      .pipe(
        tap(() => this.router.navigate([''])),
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

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
