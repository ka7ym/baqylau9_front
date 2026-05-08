import { create } from 'zustand'
import { statisticsApi } from '../api/statisticsApi'
import type { ProductStatistics } from '../api/types'

interface StatisticsStore {
  statistics: ProductStatistics | null
  loading: boolean
  error: string | null
  fetchStatistics: () => Promise<void>
}

export const useStatisticsStore = create<StatisticsStore>((set) => ({
  statistics: null,
  loading: false,
  error: null,

  fetchStatistics: async () => {
    set({ loading: true, error: null })
    try {
      const statistics = await statisticsApi.get()
      set({ statistics })
    } catch {
      set({ error: 'Не удалось загрузить статистику' })
    } finally {
      set({ loading: false })
    }
  },
}))
