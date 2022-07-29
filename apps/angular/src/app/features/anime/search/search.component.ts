import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'camp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter();

  searchValue = '';

  constructor() {

  }

  ngOnInit(): void {
    fromEvent(document.querySelector('.search__input')!, 'input').pipe(debounceTime(1000), map(() => {
      this.search.emit(this.searchValue);
      }))
      .subscribe();
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
