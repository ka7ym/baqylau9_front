import { useProductStore } from '../../../store/productStore'
import type { ProductStatus } from '../../../api/types'

const statuses: Array<{ value: ProductStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Все статусы' },
  { value: 'active', label: 'Active' },
  { value: 'out_of_stock', label: 'Out of stock' },
  { value: 'discontinued', label: 'Discontinued' },
]

export const StatusFilter = () => {
  const { selectedStatus, setSelectedStatus } = useProductStore()

  return (
    <select
      className="select-control"
      value={selectedStatus}
      onChange={(event) => setSelectedStatus(event.target.value as ProductStatus | 'all')}
    >
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  )
}
