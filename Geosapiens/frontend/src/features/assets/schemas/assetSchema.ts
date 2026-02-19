import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  serialNumber: z.string().min(1, 'O número de série é obrigatório.'),
  acquisitionDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Data de aquisição inválida.',
    })
    .refine((val) => {
   
      const inputDate = new Date(val);
      const today = new Date();
      
      today.setHours(0, 0, 0, 0);

      const userTimezoneOffset = inputDate.getTimezoneOffset() * 60000;
      const normalizedInputDate = new Date(inputDate.getTime() + userTimezoneOffset);
      
      return normalizedInputDate <= today;
    }, {
      message: 'A data de aquisição não pode estar no futuro.',
    }),
  category: z.string().optional(),
  status: z.string().optional(),
});

export type AssetFormData = z.infer<typeof assetSchema>;