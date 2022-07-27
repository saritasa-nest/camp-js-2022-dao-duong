import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

/** Paginator component. */
@Component({
  selector: 'camp-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  /** Paginator length. */
  @Input() public length = 0;

  /** Paginator page size. */
  @Input() public pageSize = 0;

  /** Paginator change event. */
  @Output() public paginatorChange = new EventEmitter();

  /** Paginator page options. */
  public pageSizeOptions: number[] = [10, 15, 20];

  /** Paginator. */
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  /**
   * Handle change event from paginator.
   * @param event Paginator event.
   */
  public onPaginatorChange(event: PageEvent): void {
    this.paginatorChange.emit(event);
  }
}
