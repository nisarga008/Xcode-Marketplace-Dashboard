export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'out-of-stock';
  vendor: string;
  description: string;
  createdAt: string;
};

export type PaginatedProducts = {
  items: (Omit<Product, 'createdAt'> & { createdAt: string })[];
  total: number;
  meta: {
    page: number;
    pages: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    query: Record<string, string>;
  }
};