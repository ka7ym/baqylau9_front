import { create } from 'zustand'
import { categoryApi } from '../api/categoryApi'
import type { Category } from '../api/types'

interface CategoryStore {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const categories = await categoryApi.getAll()
      set({ categories })
    } catch {
      set({ error: 'Не удалось загрузить категории' })
    } finally {
      set({ loading: false })
    }
  },
}))
