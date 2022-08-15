import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Login component. */
@Component({
  selector: 'camp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
