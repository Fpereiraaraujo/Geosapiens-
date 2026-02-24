import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../features/assets/hooks/useAssets';
import { Plus, Edit2, Trash2, Search, Monitor, AlertCircle } from 'lucide-react';

// Função Sênior para normalizar strings (Remove acentos e deixa tudo minúsculo)
const normalizeString = (str?: string) => {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export function DashboardPage() {
  const { assets, loading, error, removeAsset } = useAssets();
  const navigate = useNavigate();
  
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Lógica de filtragem blindada contra acentos e case-sensitive
  const filteredAssets = assets.filter((asset) => {
    const normAssetCategory = normalizeString(asset.category);
    const normAssetStatus = normalizeString(asset.status);
    const normFilterCategory = normalizeString(filterCategory);
    const normFilterStatus = normalizeString(filterStatus);

    const matchCategory = normAssetCategory.includes(normFilterCategory);
    const matchStatus = normAssetStatus.includes(normFilterStatus);
    
    return matchCategory && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Carregando seus ativos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center flex-col gap-4">
        <AlertCircle size={48} className="text-red-500" />
        <p className="text-xl text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Monitor className="text-blue-600" size={32} />
            Gerenciamento de Ativos
          </h1>
          <p className="text-gray-500 mt-1">Visualize e gerencie todos os equipamentos da empresa.</p>
        </div>
        <button 
          onClick={() => navigate('/assets/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
        >
          <Plus size={20} />
          Novo Ativo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Filtrar por Categoria (ex: Computadores)..."
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
          />
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Filtrar por Status (ex: Disponível)..."
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nome do Equipamento</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nº de Série</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data de Aquisição</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Monitor size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900">Nenhum ativo encontrado.</p>
                      <p className="text-gray-500">Tente limpar os filtros ou cadastre um novo equipamento.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">{asset.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">
                      {asset.serialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(asset.acquisitionDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                        {asset.category || 'Não definida'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        asset.status?.toLowerCase() === 'disponível' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : asset.status?.toLowerCase() === 'em manutenção'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {asset.status || 'Não definido'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {/* Botões agora sempre visíveis e sem o group-hover */}
                      <button 
                        onClick={() => navigate(`/assets/${asset.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-2 inline-flex items-center gap-1 p-2 rounded-md hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => removeAsset(asset.id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}