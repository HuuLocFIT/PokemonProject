import { z } from 'zod';

const Pokemon = z.object({
  id: z.string(),
  number: z.number(),
  name: z.string(),
  type_1: z.number().nullable(),
  type_2: z.number().nullable(),
  total: z.number(),
  hp: z.number(),
  attack: z.number(),
  defense: z.number(),
  sp_atk: z.number(),
  sp_def: z.number(),
  speed: z.number(),
  generation: z.number(),
  legendary: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  sprite: z.string().nullable().optional(),
});
type Pokemon = z.infer<typeof Pokemon>;

const PokemonType = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nullable();
type PokemonType = z.infer<typeof PokemonType>;

export { Pokemon, PokemonType };
