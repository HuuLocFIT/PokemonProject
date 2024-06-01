import { Component } from '@angular/core';
import { catchError, EMPTY, finalize, forkJoin, map, mergeMap, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon, PokemonType } from 'src/app/models/pokemon.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterModalComponent } from 'src/app/components/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/components/modals/sort-modal/sort-modal.component';
import { DetailsModalComponent } from 'src/app/components/modals/details-modal/details-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  pokemons: Pokemon[] = [];
  pageNumber: number = 1;
  pageSize: number = 12;

  pokemonTypesList: PokemonType[] = [];
  metaPokemonsList: any = null;
  filteredTypesList: PokemonType[] = [];
  isFiltered: boolean = false;

  sortField: string = '';
  sortOrder: string = 'asc';
  readonly sortTypesList: { name: string; value: string }[] = [
    { name: 'Number', value: 'number' },
    { name: 'Total', value: 'total' },
    { name: 'HP', value: 'hp' },
    { name: 'Attack', value: 'attack' },
    { name: 'Defense', value: 'defense' },
    { name: 'Special Attack', value: 'sp_atk' },
    { name: 'Special Defense', value: 'sp_def' },
    { name: 'Speed', value: 'speed' },
  ];

  pokemonDetails: Pokemon | null = null;

  constructor(
    private pokemonService: PokemonService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getPokemonsList();
  }

  getPokemonTypesList(): void {
    this.spinner.show();
    this.pokemonService.getPokemonTypesList().subscribe((response) => {
      this.spinner.hide();
      if (response.success === true && response.data) {
        this.pokemonTypesList = response.data;
      }
    });
  }
  getPokemonsList(): void {
    this.spinner.show();
    this.pokemonService
      .getPokemonsList(
        this.pageNumber,
        this.pageSize,
        this.sortField,
        this.sortOrder,
        this.filteredTypesList
      )
      .pipe(
        mergeMap((response) => {
          if (response.success === true && response.data) {
            const pokemons = response.data;
            this.metaPokemonsList = response.meta;

            const spriteObservables = pokemons.map((pokemon: Pokemon) =>
              this.pokemonService.getPokemonSprite(pokemon.id).pipe(
                map((blob) => {
                  const url = URL.createObjectURL(blob);
                  return { ...pokemon, sprite: url };
                }),
                catchError((error) => {
                  return of({ ...pokemon, sprite: '' });
                })
              )
            );
            return forkJoin(spriteObservables);
          }
          return EMPTY;
        }),
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((pokemonsWithSprites: Pokemon[]) => {
        if (pokemonsWithSprites && pokemonsWithSprites.length > 0) {
          this.pokemons = pokemonsWithSprites;

          this.getPokemonTypesList();
        }
      });
  }
  getNameFromType(typeId: number): string {
    const type = this.pokemonTypesList.find(
      (type) => type && type.id === typeId
    );
    return type ? type.name : '';
  }
  getPokemonDetails(pokemonId: string, isOpenDetailsPop?: boolean): void {
    this.spinner.show();
    this.pokemonService
      .getPokemon(pokemonId)
      .pipe(
        mergeMap((response) => {
          if (response.success === true && response.data) {
            const pokemon = response.data;
            return this.pokemonService.getPokemonSprite(pokemon.id).pipe(
              map((blob) => {
                const url = URL.createObjectURL(blob);
                return { ...pokemon, sprite: url };
              }),
              catchError((error) => {
                return of({ ...pokemon, sprite: '' });
              })
            );
          }
          return EMPTY;
        }),
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((pokemonWithSprite: Pokemon) => {
        if (pokemonWithSprite) {
          this.pokemonDetails = pokemonWithSprite;

          if (isOpenDetailsPop) {
            this.openDetailsModal();
          }
        }
      });
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getPokemonsList();
  }
  openFilterModal(): void {
    const modalRef = this.modal.open(FilterModalComponent);
    modalRef.componentInstance.pokemonTypesList = this.pokemonTypesList;
    modalRef.componentInstance.filteredTypes = this.filteredTypesList;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.filteredTypesList = result;
          if (result.length > 0) {
            this.isFiltered = true;
          } else {
            this.filteredTypesList = [];
            this.isFiltered = false;
          }
          this.pageNumber = 1;
          this.getPokemonsList();
        }
      },
      (reason) => {}
    );
  }
  openSortModal(): void {
    const modalRef = this.modal.open(SortModalComponent);
    modalRef.componentInstance.sortTypes = this.sortTypesList;
    modalRef.componentInstance.selectedSortField = this.sortField;
    modalRef.componentInstance.selectedSortOrder = this.sortOrder;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.sortField = result.sortField;
          this.sortOrder = result.sortOrder;
          this.getPokemonsList();
        }
      },
      (reason) => {}
    );
  }
  openDetailsModal() {
    if (this.pokemonDetails) {
      const modalRef = this.modal.open(DetailsModalComponent);
      modalRef.componentInstance.dataPokemon = this.pokemonDetails;
      modalRef.componentInstance.pokemonTypesList = this.pokemonTypesList;
      modalRef.result.then(
        (result) => {},
        (reason) => {}
      );
    }
  }

  ngOnDestroy() {}
}
