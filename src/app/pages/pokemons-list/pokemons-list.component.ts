import { Component } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, mergeMap, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon, PokemonType } from 'src/app/models/pokemon.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterModalComponent } from 'src/app/components/modals/filter-modal/filter-modal.component';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  pokemons: Pokemon[] = [];
  pageNumber: number = 1;
  pageSize: number = 18;
  sortField: string = 'number';
  sortOrder: string = 'asc';
  pokemonTypesList: PokemonType[] = [];
  metaPokemonsList: any = null;
  filteredTypesList: PokemonType[] = [];
  isFiltered: boolean = false;

  pokemonDetails: Pokemon | null = null;

  constructor(
    private pokemonService: PokemonService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.getPokemonsList();
    this.getPokemonTypesList();
  }

  getPokemonTypesList(): void {
    this.pokemonService.getPokemonTypesList().subscribe((response) => {
      if (response.success === true && response.data) {
        this.pokemonTypesList = response.data;

        // this.openFilterModal();
      }
    });
  }
  getPokemonsList(): void {
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
        })
      )
      .subscribe((pokemonsWithSprites: Pokemon[]) => {
        if (pokemonsWithSprites && pokemonsWithSprites.length > 0) {
          this.pokemons = pokemonsWithSprites;
        }
      });
  }
  getNameFromType(typeId: number): string {
    const type = this.pokemonTypesList.find(
      (type) => type && type.id === typeId
    );
    return type ? type.name : '';
  }
  getPokemonDetails(pokemonId: string): void {
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
        })
      )
      .subscribe((pokemonWithSprite: Pokemon) => {
        if (pokemonWithSprite) {
          this.pokemonDetails = pokemonWithSprite;
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
          this.getPokemonsList();
        }
      },
      (reason) => {}
    );
  }

  ngOnDestroy() {}
}
