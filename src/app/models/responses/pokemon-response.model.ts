import { z } from 'zod';
import { BasicApiResponse } from './basic-response.model';
import { Pokemon, PokemonType } from '../pokemon.model';

const PokemonsListResponse = BasicApiResponse.extend({
  data: z.array(Pokemon).default([]).nullable(),
  link: z
    .object({
      first: z.string().nullable(),
      last: z.string().nullable(),
      prev: z.string().nullable(),
      next: z.string().nullable(),
    })
    .nullable(),
  meta: z
    .object({
      current_page: z.number().nullable(),
      from: z.number().nullable(),
      last_page: z.number().nullable(),
      path: z.string().nullable(),
      per_page: z.number().nullable(),
      to: z.number().nullable(),
      total: z.number().nullable(),
    })
    .nullable(),
});
type PokemonsListResponse = z.infer<typeof PokemonsListResponse>;

const PokemonResponse = BasicApiResponse.extend({
  data: Pokemon.nullable().optional(),
});
type PokemonResponse = z.infer<typeof PokemonResponse>;

const PokemonTypesListResponse = BasicApiResponse.extend({
  data: z.array(PokemonType).default([]).nullable(),
});
type PokemonTypesListResponse = z.infer<typeof PokemonTypesListResponse>;

export { PokemonsListResponse, PokemonResponse, PokemonTypesListResponse };
