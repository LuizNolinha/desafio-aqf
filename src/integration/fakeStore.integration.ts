import { FSApi } from '../infra/axios';

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate?: number 
  }
}



export const  fakeStore = {
    getAllProducts: async () => {
        try {
            const { data } = await FSApi.get<IProduct[]>('/products');
 
            return data;
        } catch (ex) {
           throw new Error(`Erro ao buscar produtos ${ex}`);
        }
    },
    getProductById: async (id: number) => {
        try {
            const { data }  = await FSApi.get<IProduct | undefined>(`/products/${id}`);
            
            return data;
        } catch (ex) {
           throw new Error(`Erro ao buscar produto ${ex}`);
        }
    }
}; 