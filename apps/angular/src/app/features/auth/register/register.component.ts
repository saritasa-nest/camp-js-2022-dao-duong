import { ChangeDetectionStrategy, Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Register } from '@js-camp/core/models/auth/register';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';

import { UserService, UrlService, ErrorService } from '../../../../core/services/';

/** Register component. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  private readonly subscriptionDestroyed$: Subject<boolean> = new Subject();

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly urlService: UrlService,
    private readonly errorService: ErrorService,
    private readonly changeDetectorRef: ChangeDetectorRef,
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
        catchError((error: unknown) => of(this.handleError(error))),
        takeUntil(this.subscriptionDestroyed$),
      )
      .subscribe();
  }

  /**
   * Validate password confirmation.
   * @param password Password value.
   * @param confirmPassword Password confirmation value.
   */
  public validateConfirmPassword(
    password: string,
    confirmPassword: string,
  ): boolean {
    return password === confirmPassword;
  }

  /**
   * Handle error from server.
   * @param error Error from server.
   */
  private handleError(error: unknown): void {
    const errorData = this.errorService.getError(error);
    this.errorService.showErrorToForm(errorData, this.registerForm);
    this.changeDetectorRef.markForCheck();
  }

  /** On destroy lifecycle hook. */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
