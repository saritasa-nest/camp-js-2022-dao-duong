import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Login component. */
@Component({
  selector: 'camp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

}
