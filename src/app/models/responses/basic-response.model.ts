import { z } from 'zod';

const BasicApiResponse = z.object({
  success: z.boolean().nullable(),
  status: z.number().nullable(),
});
type BasicApiResponse = z.infer<typeof BasicApiResponse>;

export { BasicApiResponse };
