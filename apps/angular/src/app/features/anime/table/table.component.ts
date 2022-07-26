import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  /** Paginator page size. */
  public pageSize = 10;

  /** Paginator page options. */
  public pageSizeOptions: number[] = [10, 15, 20];

  /** Anime list observer. */
  public animeList$: Observable<Pagination<Anime>>;

  /** Paginator page event. */
  public pageEvent!: PageEvent;

  /** Request params. */
  public params = new HttpParams();

  /** Paginator. */
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  /** Anime table column. */
  public displayedColumns: string[] = [
    'image',
    'title_eng',
    'title_jpn',
    'type',
    'status',
  ];

  public constructor(private animeService: AnimeService) {
    this.params = this.params.set('limit', this.pageSize);
    this.animeList$ = this.animeService.getAnime(this.params);
  }

  /** After view init lifecycle. */
  public ngAfterViewInit(): void {
    this.animeList$.subscribe(animeList => {
      this.paginator.length = animeList.count;
    });
  }

  /**
   * Handle change event from paginator.
   * @param event Paginator event.
   */
  public handlePaginatorChange(event: PageEvent): void {
    this.params = this.params
      .set('limit', event.pageSize)
      .set('offset', event.pageSize * event.pageIndex);
    this.animeList$ = this.animeService.getAnime(this.params);
  }
}
