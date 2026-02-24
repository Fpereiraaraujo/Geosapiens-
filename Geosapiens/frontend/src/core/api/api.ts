
import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
 
  baseURL: 'http://localhost:8080/assets',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
   
    const errorMessage = error.response?.data?.error || 'Ocorreu um erro inesperado de comunicação.';
    
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);