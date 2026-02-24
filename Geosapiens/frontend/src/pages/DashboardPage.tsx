
import { useState } from 'react';
import { useAssets } from '../features/assets/hooks/useAssets';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function DashboardPage() {
  const { assets, loading, error, removeAsset } = useAssets();
  
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');


  const filteredAssets = assets.filter((asset) => {
    const matchCategory = asset.category?.toLowerCase().includes(filterCategory.toLowerCase()) ?? true;
    const matchStatus = asset.status?.toLowerCase().includes(filterStatus.toLowerCase()) ?? true;
    return matchCategory && matchStatus;
  });

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Carregando ativos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Ativos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Novo Ativo
        </button>
      </div>

     
      <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Filtrar por Categoria..."
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Filtrar por Status..."
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº de Série</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aquisição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Nenhum ativo encontrado.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{asset.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{asset.serialNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  
                    {new Date(asset.acquisitionDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{asset.category || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{asset.status || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center gap-1">
                      <Edit2 size={16} /> Editar
                    </button>
                    <button 
                      onClick={() => removeAsset(asset.id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}