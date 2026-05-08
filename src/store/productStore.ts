import { create } from 'zustand'
import { productApi } from '../api/productApi'
import type { Product, ProductCreate, ProductStatus } from '../api/types'

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  selectedStatus: ProductStatus | 'all'
  fetchProducts: () => Promise<void>
  createProduct: (payload: ProductCreate) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  setSelectedStatus: (status: ProductStatus | 'all') => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  selectedStatus: 'all',

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const products = await productApi.getAll()
      set({ products })
    } catch {
      set({ error: 'Не удалось загрузить товары' })
    } finally {
      set({ loading: false })
    }
  },

  createProduct: async (payload) => {
    set({ loading: true, error: null })
    try {
      await productApi.create(payload)
      const products = await productApi.getAll()
      set({ products })
    } catch {
      set({ error: 'Не удалось добавить товар' })
    } finally {
      set({ loading: false })
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null })
    try {
      await productApi.delete(id)
      const products = await productApi.getAll()
      set({ products })
    } catch {
      set({ error: 'Не удалось удалить товар' })
    } finally {
      set({ loading: false })
    }
  },

  setSelectedStatus: (status) => set({ selectedStatus: status }),
}))
