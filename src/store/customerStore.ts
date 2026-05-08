import { create } from 'zustand'
import { customerApi } from '../api/customerApi'
import type { Customer } from '../api/types'

interface CustomerStore {
  customers: Customer[]
  loading: boolean
  error: string | null
  fetchCustomers: () => Promise<void>
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null })
    try {
      const customers = await customerApi.getAll()
      set({ customers })
    } catch {
      set({ error: 'Не удалось загрузить покупателей' })
    } finally {
      set({ loading: false })
    }
  },
}))
