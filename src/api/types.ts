export type ProductStatus = 'active' | 'out_of_stock' | 'discontinued'

export interface Category {
  id: number
  name: string
  description: string | null
  max_items: number
  created_at?: string | null
}

export interface Customer {
  id: number
  full_name: string
  email: string
  phone: string | null
  category_id: number
  category_name: string
  registered_at?: string | null
}

export interface ProductCustomer {
  id: number
  full_name: string
  email: string
  quantity: number
}

export interface Product {
  id: number
  name: string
  brand: string
  price: number
  stock_quantity: number
  status: ProductStatus
  category: Category
  customers: ProductCustomer[]
  total_customers: number
  total_quantity_sold: number
  approval_percentage: number
  reviews_approved: number
  reviews_total: number
  created_at?: string | null
}

export interface CustomerAssignmentCreate {
  customer_id: number
  quantity: number
}

export interface ProductCreate {
  name: string
  brand: string
  price: number
  stock_quantity: number
  status: ProductStatus
  category_id: number
  customer_assignments: CustomerAssignmentCreate[]
}

export interface ProductDeleteResponse {
  message: string
  deleted_id: number
}

export interface ProductsByStatus {
  status: ProductStatus
  count: number
}

export interface ProductsByCategory {
  category_id: number
  category_name: string
  products_count: number
  total_stock_available: number
  average_approval_percentage: number
}

export interface ProductsCustomersOverview {
  product_id: number
  name: string
  customers_count: number
  average_review_rating: number | null
  total_quantity_sold: number
}

export interface ProductStatistics {
  total_products: number
  products_by_status: ProductsByStatus[]
  total_items_limit: number
  total_stock_available: number
  availability_percent: number
  total_customers_assigned: number
  average_customers_per_product: number
  total_quantity_sold: number
  products_by_category: ProductsByCategory[]
  products_customers_overview: ProductsCustomersOverview[]
}
