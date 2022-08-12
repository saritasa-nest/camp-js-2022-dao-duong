import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

/** Login component. */
@Component({
  selector: 'camp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  /** Close event emitter. */
  @Output() public closeModal = new EventEmitter();

  /** Close modal action.  */
  public onModalClose(): void {
    this.closeModal.emit();
  }
}
