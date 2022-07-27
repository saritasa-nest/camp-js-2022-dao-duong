import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeComponent } from './anime.component';
import { TableComponent } from './table/table.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, TableComponent],
  imports: [CommonModule, AnimeRoutingModule, MatTableModule, MatProgressSpinnerModule],
})
export class AnimeModule {}
