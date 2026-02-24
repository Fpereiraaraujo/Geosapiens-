import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  serialNumber: z.string().min(1, 'O número de série é obrigatório.'),
  acquisitionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data de aquisição inválida.',
  }),
  category: z.string().optional(),
  status: z.string().optional(),
});


export type AssetFormData = z.infer<typeof assetSchema>;