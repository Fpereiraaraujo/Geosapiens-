
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { AssetFormPage } from './pages/AssetFormPage';
import { Toaster } from 'sonner';

export function App() {
  return (
    <BrowserRouter>
     
      <Toaster position="top-right" richColors />
      
      <div className="min-h-screen bg-gray-50">
        <Routes>
      
          <Route path="/" element={<Navigate to="/assets" replace />} />
          
          <Route path="/assets" element={<DashboardPage />} />
          <Route path="/assets/new" element={<AssetFormPage />} />
          <Route path="/assets/:id" element={<AssetFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;