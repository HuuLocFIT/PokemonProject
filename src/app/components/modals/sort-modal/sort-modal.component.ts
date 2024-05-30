import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
})
export class SortModalComponent {
  @Input() sortTypes: { name: string; value: string }[] = [];
  @Input() selectedSortField: string = '';
  @Input() selectedSortOrder: string = '';

  sortField: string | undefined = undefined;
  sortOrder: string | undefined = undefined;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.selectedSortField !== '') {
      this.sortField = this.selectedSortField;
    }
    if (this.selectedSortOrder !== '') {
      this.sortOrder = this.selectedSortOrder;
    }

    console.log(this.sortOrder, this.sortField);
  }

  handleChangeSortOrder(e: any) {
    this.sortOrder = e;
  }
  handleCloseModal() {
    this.activeModal.close();
  }
  handleSort() {
    this.activeModal.close({
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    });
  }

  ngOnDestroy() {}
}
