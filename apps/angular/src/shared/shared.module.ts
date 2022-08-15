import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { AnimeFormComponent } from './components/anime-form/anime-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/** Shared module. */
@NgModule({
  declarations: [NavbarComponent, ModalComponent, SpinnerComponent, AnimeFormComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [NavbarComponent, ModalComponent, SpinnerComponent, AnimeFormComponent, PageNotFoundComponent],
})
export class SharedModule {}
