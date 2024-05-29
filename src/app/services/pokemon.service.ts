import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PokemonsListResponse,
  PokemonResponse,
  PokemonTypesListResponse,
} from '../models/responses/pokemon-response.model';

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
    filters: any
  ): Observable<PokemonsListResponse> {
    let params = new HttpParams()
      .set('page[number]', pageNumber.toString())
      .set('page[size]', pageSize.toString())
      .set('sort', `${sortOrder === 'desc' ? '-' : ''}${sortField}`);

    Object.keys(filters).forEach((key) => {
      params = params.set(`filter[${key}]`, filters[key]);
    });

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
