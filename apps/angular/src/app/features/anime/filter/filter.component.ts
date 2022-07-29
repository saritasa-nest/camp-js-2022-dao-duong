import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '@js-camp/core/interfaces/option';

/** Filter component. */
@Component({
  selector: 'camp-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  /** Type change event. */
  @Output() public typeChange = new EventEmitter();

  /** Available type for filtering. */
  public FILTERING_TYPES: readonly Option[] = [
    { text: 'None', value: '' },
    { text: 'Tv', value: 'TV' },
    { text: 'Ova', value: 'OVA' },
    { text: 'Movie', value: 'MOVIE' },
    { text: 'Special', value: 'SPECIAL' },
    { text: 'Ona', value: 'ONA' },
    { text: 'Music', value: 'MUSIC' },
  ];

  /** Selected type value. */
  @Input() public selectedType = this.FILTERING_TYPES[0].value;

  /**
   * Table tracking function.
   * @param _index Index of the anime.
   * @param type Type data.
   */
  public trackType(_index: number, type: Option): string {
    return type.value;
  }

  /** On select type change function. */
  public onSelectionChange(): void {
    this.typeChange.emit(this.selectedType);
  }
}
