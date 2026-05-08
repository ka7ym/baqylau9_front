import { useEffect, useMemo, useState } from 'react'
import { useCategoryStore } from '../../store/categoryStore'
import { useCustomerStore } from '../../store/customerStore'
import { useProductStore } from '../../store/productStore'
import { useStatisticsStore } from '../../store/statisticsStore'
import { AddProductModal } from './components/AddProductModal'
import { ProductTable } from './components/ProductTable'
import { StatisticsDashboard } from './components/StatisticsDashboard'
import { StatusFilter } from './components/StatusFilter'

export const ElectronicsShopPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { products, selectedStatus, loading, error, fetchProducts } = useProductStore()
  const { fetchStatistics } = useStatisticsStore()
  const { fetchCustomers } = useCustomerStore()
  const { fetchCategories } = useCategoryStore()

  useEffect(() => {
    fetchProducts()
    fetchStatistics()
    fetchCustomers()
    fetchCategories()
  }, [fetchProducts, fetchStatistics, fetchCustomers, fetchCategories])

  const filteredProducts = useMemo(() => {
    if (selectedStatus === 'all') return products
    return products.filter((product) => product.status === selectedStatus)
  }, [products, selectedStatus])

  const refreshAll = async () => {
    await fetchProducts()
    await fetchStatistics()
  }

  return (
    <div className="page-grid">
      <section className="hero-card">
        <div>
          <p className="eyebrow">React + TypeScript + FastAPI</p>
          <h2>Интернет-магазин электроники</h2>
          <p>
            Таблица товаров, фильтр по статусу, статистика, добавление товара с назначением покупателей и удаление товара.
          </p>
        </div>
        <button className="primary-button" type="button" onClick={() => setIsModalOpen(true)}>
          Добавить товар
        </button>
      </section>

      <StatisticsDashboard />

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GET /api/products</p>
            <h3>Список товаров</h3>
          </div>
          <StatusFilter />
        </div>

        {error && <p className="error-text">{error}</p>}
        {loading ? <p className="muted-text">Загрузка товаров...</p> : <ProductTable products={filteredProducts} onChanged={refreshAll} />}
      </section>

      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} onCreated={refreshAll} />}
    </div>
  )
}
