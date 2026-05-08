import { useStatisticsStore } from '../../../store/statisticsStore'

export const StatisticsDashboard = () => {
  const { statistics, loading, error } = useStatisticsStore()

  if (loading) {
    return <section className="content-card"><p className="muted-text">Загрузка статистики...</p></section>
  }

  if (error) {
    return <section className="content-card"><p className="error-text">{error}</p></section>
  }

  if (!statistics) {
    return null
  }

  return (
    <section className="content-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GET /api/products/statistics</p>
          <h3>Статистика ассортимента</h3>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Всего товаров</span>
          <strong>{statistics.total_products}</strong>
        </div>
        <div className="stat-card">
          <span>Лимит товаров</span>
          <strong>{statistics.total_items_limit}</strong>
        </div>
        <div className="stat-card">
          <span>Остаток на складе</span>
          <strong>{statistics.total_stock_available}</strong>
        </div>
        <div className="stat-card">
          <span>Доступность</span>
          <strong>{statistics.availability_percent}%</strong>
        </div>
        <div className="stat-card">
          <span>Покупатели</span>
          <strong>{statistics.total_customers_assigned}</strong>
        </div>
        <div className="stat-card">
          <span>Продано единиц</span>
          <strong>{statistics.total_quantity_sold}</strong>
        </div>
      </div>

      <div className="two-columns">
        <div className="mini-panel">
          <h4>Товары по статусам</h4>
          {statistics.products_by_status.map((item) => (
            <div className="line-row" key={item.status}>
              <span>{item.status}</span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>

        <div className="mini-panel">
          <h4>Товары по категориям</h4>
          {statistics.products_by_category.map((item) => (
            <div className="line-row" key={item.category_id}>
              <span>{item.category_name}</span>
              <strong>{item.products_count}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="mini-panel">
        <h4>Обзор товаров и покупателей</h4>
        <div className="overview-list">
          {statistics.products_customers_overview.map((item) => (
            <div className="overview-item" key={item.product_id}>
              <strong>{item.name}</strong>
              <span>Покупателей: {item.customers_count}</span>
              <span>Средний рейтинг: {item.average_review_rating ?? 0}</span>
              <span>Продано: {item.total_quantity_sold}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
