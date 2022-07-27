import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

/** Sort options. */
export interface SortOption {

  /** Sort option text. */
  readonly text: string;

  /** Sort option value. */
  readonly value: string;
}

/** Available options for sorting. */
enum Ordering {
  EnglishTitle = 'title_eng',
  Status = 'status',
  AiredStart = 'aired__startswith',
}

/** Sort component. */
@Component({
  selector: 'camp-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  /** Sort change event. */
  @Output() public sortChange = new EventEmitter();

  /** Available value for sorting options. */
  public SORT_OPTIONS: readonly SortOption[] = [
    { text: 'Default', value: '' },
    { text: 'English Title', value: Ordering.EnglishTitle },
    { text: 'Aired Start', value: Ordering.AiredStart },
    { text: 'Status', value: Ordering.Status },
  ];

  /** Available direction for sorting options. */
  public SORT_DIRECTIONS: readonly SortOption[] = [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

  /** Selected option value for sorting options. */
  public selectedOption = '';

  /** Selected direction for sorting options. */
  public selectedDirection = '';

  /** Handle selection change event. */
  public onSelectionChange(): void {
    this.sortChange.emit(this.selectedDirection + this.selectedOption);
  }
}
