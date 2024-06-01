import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../components/modals/confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private modal: NgbModal) {}

  show(title: string, message: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef;
  }
}
