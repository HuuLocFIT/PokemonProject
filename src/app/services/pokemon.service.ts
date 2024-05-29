import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PokemonsListResponse,
  PokemonResponse,
  PokemonTypesListResponse,
} from '../models/responses/pokemon-response.model';
import { PokemonType } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private PREFIX_URL_API = 'https://api.vandvietnam.com/api/pokemon-api/';

  constructor(private http: HttpClient) {}

  getPokemonsList(
    pageNumber: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    filters: PokemonType[]
  ): Observable<PokemonsListResponse> {
    let params = new HttpParams()
      .set('page[number]', pageNumber.toString())
      .set('page[size]', pageSize.toString())
      .set('sort', `${sortOrder === 'desc' ? '-' : ''}${sortField}`);

    // filters.forEach((item: PokemonType) => {
    //   if (item) {
    //     console.log(item.id);
    //     params = params.set(`filter[type]`, item.id);
    //   }
    // });

    // Create an array to store the type IDs
    let typeIds: string[] = [];

    // Loop through each selected filter item
    filters.forEach((item: PokemonType) => {
      // Check if the item is not null or undefined
      if (item) {
        // Add the type ID to the array
        typeIds.push(item.id.toString());
      }
    });

    // Check if there are any type IDs in the array
    if (typeIds.length > 0) {
      // Concatenate the type IDs into a comma-separated string
      const typeIdsString = typeIds.join(',');

      // Set the filter parameter with the comma-separated string of type IDs
      params = params.set(`filter[type]`, typeIdsString);
    }

    return this.http.get<PokemonsListResponse>(
      `${this.PREFIX_URL_API}pokemons`,
      { params }
    );
  }

  getPokemon(pokemonId: string): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(
      `${this.PREFIX_URL_API}pokemons/${pokemonId}`
    );
  }

  getPokemonSprite(pokemonId: string): Observable<Blob> {
    const spriteUrl = `${this.PREFIX_URL_API}pokemons/${pokemonId}/sprite`;
    return this.http.get(spriteUrl, { responseType: 'blob' });
  }

  getPokemonTypesList(): Observable<PokemonTypesListResponse> {
    return this.http.get<PokemonTypesListResponse>(
      `${this.PREFIX_URL_API}types`
    );
  }
}
