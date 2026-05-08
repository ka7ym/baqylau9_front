import { api } from './axios'
import type { Customer } from './types'

export const customerApi = {
  getAll: async () => {
    const response = await api.get<Customer[]>('/api/customers')
    return response.data
  },
}
