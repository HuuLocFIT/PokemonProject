import { Component, Input } from '@angular/core';
import { Pokemon, PokemonType } from 'src/app/models/pokemon.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  @Input() dataPokemon: Pokemon | null = null;
  @Input() pokemonTypesList: PokemonType[] = [];

  readonly generationList = [
    {
      order: 1,
      name: 'Thế hệ I',
      region: 'Kanto',
    },
    {
      order: 2,
      name: 'Thế hệ II',
      region: 'Johto, Kanto',
    },
    {
      order: 3,
      name: 'Thế hệ III',
      region: 'Hoenn, Kanto',
    },
    {
      order: 4,
      name: 'Thế hệ IV',
      region: 'Sinnoh, Johto, Kanto',
    },
    {
      order: 5,
      name: 'Thế hệ V',
      region: 'Unova',
    },
    {
      order: 6,
      name: 'Thế hệ VI',
      region: 'Kalos, Hoenn',
    },
    {
      order: 7,
      name: 'Thế hệ VII',
      region: 'Alola, Kanto',
    },
    {
      order: 8,
      name: 'Thế hệ VIII',
      region: 'Galar, Sinnoh, Hisui',
    },
    {
      order: 9,
      name: 'Thế hệ IX',
      region: 'Paldea, Kalos',
    },
  ];

  constructor(private activeModal: NgbActiveModal) {}

  getNameFromType(typeId: number): string {
    const type = this.pokemonTypesList.find(
      (type) => type && type.id === typeId
    );
    return type ? type.name : '';
  }

  getNameAndRegionGeneration(generationValue: number) {
    const generation = this.generationList.find(
      (generation) => generation.order === generationValue
    );
    return generation ? `${generation.name} - ${generation.region}` : '';
  }

  ngOnInit() {}

  handleCloseModal() {
    this.activeModal.close();
  }

  ngOnDestroy() {}
}
