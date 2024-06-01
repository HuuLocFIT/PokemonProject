import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() message: string = '';
  @Input() title: string = '';

  constructor(private activeModal: NgbActiveModal) {}

  handleCloseModal() {
    this.activeModal.close();
  }

  ngOnInit() {}
}
