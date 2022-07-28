import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
