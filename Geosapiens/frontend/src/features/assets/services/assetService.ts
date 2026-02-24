
import { Asset } from '../types';
import { AssetFormData } from '../schemas/assetSchema';
import { api } from '../../../core/api/api';

export const assetService = {
  
  getAll: async (): Promise<Asset[]> => {
    const response = await api.get<Asset[]>('');
    return response.data;
  },

  getById: async (id: string): Promise<Asset> => {
    const response = await api.get<Asset>(`/${id}`);
    return response.data;
  },

  create: async (assetData: AssetFormData): Promise<Asset> => {
    const response = await api.post<Asset>('', assetData);
    return response.data;
  },

  update: async (id: string, assetData: AssetFormData): Promise<Asset> => {
    const response = await api.put<Asset>(`/${id}`, assetData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  }
};