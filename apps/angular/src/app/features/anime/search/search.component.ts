import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'camp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input() public searchValue = '';
  @Output() public search = new EventEmitter();

  public ngOnInit(): void {
    fromEvent(document.querySelector('.search__input')!, 'input').pipe(debounceTime(1000), map(() => {
      this.search.emit(this.searchValue);
      }))
      .subscribe();
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
