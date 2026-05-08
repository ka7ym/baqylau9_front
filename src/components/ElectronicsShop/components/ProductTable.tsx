import type { Product } from '../../../api/types'
import { useProductStore } from '../../../store/productStore'

interface Props {
  products: Product[]
  onChanged: () => Promise<void>
}

export const ProductTable = ({ products, onChanged }: Props) => {
  const { deleteProduct } = useProductStore()

  const handleDelete = async (id: number) => {
    await deleteProduct(id)
    await onChanged()
  }

  if (products.length === 0) {
    return <p className="muted-text">Товаров пока нет</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Бренд</th>
            <th>Цена</th>
            <th>Остаток</th>
            <th>Статус</th>
            <th>Категория</th>
            <th>Покупатели</th>
            <th>Отзывы</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <strong>{product.name}</strong>
              </td>
              <td>{product.brand}</td>
              <td>{Number(product.price).toLocaleString('ru-RU')} ₸</td>
              <td>{product.stock_quantity}</td>
              <td>
                <span className={`status status-${product.status}`}>{product.status}</span>
              </td>
              <td>
                {product.category.name}
                <br />
                <span className="small-text">limit: {product.category.max_items}</span>
              </td>
              <td>
                <div className="employee-list">
                  {product.customers.map((customer) => (
                    <span key={customer.id}>{customer.full_name} ({customer.quantity} шт.)</span>
                  ))}
                </div>
                <span className="small-text">Всего: {product.total_customers}</span>
              </td>
              <td>
                {product.reviews_approved}/{product.reviews_total}
                <br />
                <span className="small-text">{product.approval_percentage}% approved</span>
              </td>
              <td>
                <button className="danger-button" type="button" onClick={() => handleDelete(product.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
