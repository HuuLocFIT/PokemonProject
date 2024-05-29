import { Component, Input, Output } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent {
  @Input() pokemonTypesList: PokemonType[] = [];
  @Input() filteredTypes: PokemonType[] = [];
  pokemonTypesListCopy: PokemonType[] = [];

  constructor(private activeModal: NgbActiveModal) {}

  handleApplyFilter() {
    const filteredList = this.pokemonTypesListCopy.filter(
      (type) => type && type.isChecked
    );
    this.activeModal.close(filteredList);
  }
  handleResetFilter() {
    this.pokemonTypesListCopy.forEach((type) => {
      if (type) {
        type.isChecked = false;
      }
    });
  }
  handleCloseModal() {
    this.activeModal.close();
  }
  handleChangeFilter(type: PokemonType) {
    if (type) {
      this.pokemonTypesListCopy.forEach((pokemonType) => {
        if (pokemonType && pokemonType.id === type.id) {
          pokemonType.isChecked = !pokemonType.isChecked;
        }
      });
    }
  }

  getNameFromType(typeId: number): string {
    const type = this.pokemonTypesList.find(
      (type) => type && type.id === typeId
    );
    return type ? type.name : '';
  }

  ngOnInit() {
    if (this.pokemonTypesList) {
      // Init
      this.pokemonTypesListCopy = this.pokemonTypesList.map((type) => {
        if (type) {
          return {
            ...type,
            isChecked: false,
          };
        }
        return null;
      });

      // Change if ischecked
      const filteredTypeIdsSet = new Set(
        this.filteredTypes.map((type) => type && type.id)
      );
      this.pokemonTypesListCopy.forEach((type: PokemonType) => {
        if (type && filteredTypeIdsSet.has(type.id)) {
          type.isChecked = true;
        }
      });
    }
  }
}
