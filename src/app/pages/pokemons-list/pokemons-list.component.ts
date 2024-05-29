import { Component } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, mergeMap, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon, PokemonType } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent {
  pokemons: Pokemon[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  sortField: string = 'number';
  sortOrder: string = 'asc';
  filters: any = {};
  pokemonTypesList: PokemonType[] = [];

  pokemonDetails: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemonsList();
    this.getPokemonTypesList();
  }

  getPokemonTypesList(): void {
    this.pokemonService.getPokemonTypesList().subscribe((response) => {
      if (response.success === true && response.data) {
        this.pokemonTypesList = response.data;
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
        this.filters
      )
      .pipe(
        mergeMap((response) => {
          if (response.success === true && response.data) {
            const pokemons = response.data;
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

  ngOnDestroy() {}
}
