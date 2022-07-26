/* eslint-disable jsdoc/require-jsdoc */
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {

  public animeList!: MatTableDataSource<Anime>;

  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  /** Anime table column. */
  public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'type', 'status'];

  public constructor(private animeService: AnimeService) {
    this.animeService.getAnime().subscribe(animeResponse => {
      this.animeList = new MatTableDataSource(animeResponse.results.slice());
      this.animeList.paginator = this.paginator;
      console.log(this.animeList.paginator);

    });
  }
}
