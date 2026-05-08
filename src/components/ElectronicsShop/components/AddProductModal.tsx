import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { ProductCreate, ProductStatus } from '../../../api/types'
import { useCategoryStore } from '../../../store/categoryStore'
import { useCustomerStore } from '../../../store/customerStore'
import { useProductStore } from '../../../store/productStore'

interface Props {
  onClose: () => void
  onCreated: () => Promise<void>
}

const statuses: ProductStatus[] = ['active', 'out_of_stock', 'discontinued']

export const AddProductModal = ({ onClose, onCreated }: Props) => {
  const { categories } = useCategoryStore()
  const { customers } = useCustomerStore()
  const { createProduct, loading } = useProductStore()

  const [form, setForm] = useState<ProductCreate>({
    name: '',
    brand: '',
    price: 1,
    stock_quantity: 0,
    status: 'active',
    category_id: categories[0]?.id ?? 0,
    customer_assignments: [],
  })

  const selectedCustomerIds = useMemo(
    () => form.customer_assignments.map((item) => item.customer_id),
    [form.customer_assignments],
  )

  const handleCustomerToggle = (customerId: number) => {
    const exists = selectedCustomerIds.includes(customerId)
    if (exists) {
      setForm({
        ...form,
        customer_assignments: form.customer_assignments.filter((item) => item.customer_id !== customerId),
      })
      return
    }

    setForm({
      ...form,
      customer_assignments: [...form.customer_assignments, { customer_id: customerId, quantity: 1 }],
    })
  }

  const handleQuantityChange = (customerId: number, value: number) => {
    setForm({
      ...form,
      customer_assignments: form.customer_assignments.map((item) =>
        item.customer_id === customerId ? { ...item, quantity: value } : item,
      ),
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await createProduct(form)
    await onCreated()
    onClose()
  }

  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={handleSubmit}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">POST /api/products</p>
            <h3>Добавить товар</h3>
          </div>
          <button className="ghost-button" type="button" onClick={onClose}>
            Закрыть
          </button>
        </div>

        <label className="field-label">
          Название
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Например: iPhone 16 Pro"
          />
        </label>

        <div className="form-grid">
          <label className="field-label">
            Бренд
            <input
              required
              value={form.brand}
              onChange={(event) => setForm({ ...form, brand: event.target.value })}
              placeholder="Например: Apple"
            />
          </label>

          <label className="field-label">
            Категория
            <select
              required
              value={form.category_id}
              onChange={(event) => setForm({ ...form, category_id: Number(event.target.value) })}
            >
              <option value={0}>Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Статус
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value as ProductStatus })}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="field-label">
            Price
            <input
              type="number"
              min={1}
              step="0.01"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
            />
          </label>

          <label className="field-label">
            Stock quantity
            <input
              type="number"
              min={0}
              value={form.stock_quantity}
              onChange={(event) => setForm({ ...form, stock_quantity: Number(event.target.value) })}
            />
          </label>
        </div>

        <div className="employee-select-box">
          <h4>Покупатели</h4>
          {customers.map((customer) => {
            const assignment = form.customer_assignments.find((item) => item.customer_id === customer.id)
            return (
              <div className="employee-assignment" key={customer.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(assignment)}
                    onChange={() => handleCustomerToggle(customer.id)}
                  />
                  {customer.full_name} — {customer.email}
                </label>

                {assignment && (
                  <input
                    type="number"
                    min={0}
                    value={assignment.quantity}
                    onChange={(event) => handleQuantityChange(customer.id, Number(event.target.value))}
                    placeholder="quantity"
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="modal-actions">
          <button className="ghost-button" type="button" onClick={onClose}>
            Отмена
          </button>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  )
}
