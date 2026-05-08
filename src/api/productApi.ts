import { api } from './axios'
import type { Product, ProductCreate, ProductDeleteResponse } from './types'

export const productApi = {
  getAll: async () => {
    const response = await api.get<Product[]>('/api/products')
    return response.data
  },

  create: async (payload: ProductCreate) => {
    const response = await api.post<Product>('/api/products', payload)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete<ProductDeleteResponse>(`/api/products/${id}`)
    return response.data
  },
}
