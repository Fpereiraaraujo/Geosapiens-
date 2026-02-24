
import { useState, useEffect, useCallback } from 'react';
import { Asset } from '../types';
import { assetService } from '../services/assetService';
import { toast } from 'sonner';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assetService.getAll();
      setAssets(data);
    } catch (err) {
      setError('Falha ao carregar a lista de ativos.');
    
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAsset = async (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja remover este ativo?');
    if (!confirmDelete) return;

    try {
      await assetService.delete(id);
      toast.success('Ativo removido com sucesso!');
      fetchAssets(); 
    } catch (err) {
      console.error('Erro ao deletar ativo', err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, loading, error, removeAsset, refetch: fetchAssets };
}