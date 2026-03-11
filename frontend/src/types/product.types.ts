export interface Product {
  id: number | string;
  _id?: string;
  productId?: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
