import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/** Shared module. */
@NgModule({
  declarations: [SpinnerComponent, PageNotFoundComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerComponent, PageNotFoundComponent],
})
export class SharedModule { }
