import { api } from './axios'
import type { ProductStatistics } from './types'

export const statisticsApi = {
  get: async () => {
    const response = await api.get<ProductStatistics>('/api/products/statistics')
    return response.data
  },
}
