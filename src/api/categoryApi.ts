import { api } from './axios'
import type { Category } from './types'

export const categoryApi = {
  getAll: async () => {
    const response = await api.get<Category[]>('/api/categories')
    return response.data
  },
}
