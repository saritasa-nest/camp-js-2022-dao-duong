import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
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
  @Input() public selectedOption = this.SORT_OPTIONS[0].value;

  /** Selected direction for sorting options. */
  @Input() public selectedDirection = this.SORT_DIRECTIONS[0].value;

  /** Handle selection change event. */
  public onSelectionChange(): void {
    const sortValue = this.selectedDirection + this.selectedOption;
    this.sortChange.emit(this.selectedOption ? sortValue : '');
  }

  /**
   * Table tracking function.
   * @param _index Index of the anime.
   * @param sortOption Anime data.
   */
  public trackSort(_index: number, sortOption: SortOption): string {
    return sortOption.value;
  }

}
