import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, Monitor, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { assetSchema, AssetFormData } from '../features/assets/schemas/assetSchema';
import { assetService } from '../features/assets/services/assetService';

export function AssetFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: '',
      serialNumber: '',
      acquisitionDate: '',
      category: '',
      status: 'Disponível',
    }
  });


  useEffect(() => {
    async function loadAsset() {
      if (!id) return;
      
      try {
        const asset = await assetService.getById(id);
       
        reset({
          name: asset.name,
          serialNumber: asset.serialNumber,
          acquisitionDate: asset.acquisitionDate.split('T')[0], 
          category: asset.category || '',
          status: asset.status || 'Disponível',
        });
      } catch (error) {
        toast.error('Erro ao carregar os dados do ativo.');
        navigate('/assets');
      } finally {
        setIsLoadingData(false);
      }
    }

    loadAsset();
  }, [id, reset, navigate]);

  const onSubmit = async (data: AssetFormData) => {
    try {
      setIsSubmitting(true);
      
      if (isEditMode && id) {
        await assetService.update(id, data);
        toast.success('Ativo atualizado com sucesso!');
      } else {
        await assetService.create(data);
        toast.success('Ativo cadastrado com sucesso!');
      }
      
     
      navigate('/assets');
    } catch (error) {
    
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center flex-col gap-4">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium">Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
    
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/assets')}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Monitor className="text-blue-600" size={28} />
            {isEditMode ? 'Editar Equipamento' : 'Novo Equipamento'}
          </h1>
          <p className="text-gray-500 mt-1">
            Preencha os dados abaixo para {isEditMode ? 'atualizar' : 'cadastrar'} no sistema.
          </p>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
           
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Equipamento <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="Ex: Monitor Dell 24'', Notebook Lenovo ThinkPad..."
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all focus:ring-2 ${
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.name.message}</p>}
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Série (S/N) <span className="text-red-500">*</span>
              </label>
              <input
                {...register('serialNumber')}
                type="text"
                placeholder="Ex: BR-12345XYZ"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all focus:ring-2 ${
                  errors.serialNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.serialNumber && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.serialNumber.message}</p>}
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Aquisição <span className="text-red-500">*</span>
              </label>
              <input
                {...register('acquisitionDate')}
                type="date"
                className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all focus:ring-2 ${
                  errors.acquisitionDate ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.acquisitionDate && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.acquisitionDate.message}</p>}
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Selecione uma categoria...</option>
                <option value="Computadores">Computadores</option>
                <option value="Monitores">Monitores</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Móveis">Móveis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status do Ativo</label>
              <select
                {...register('status')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="Disponível">Disponível</option>
                <option value="Em Uso">Em Uso</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Descartado">Descartado</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-200" />

          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/assets')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Save size={20} /> Salvar Equipamento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}