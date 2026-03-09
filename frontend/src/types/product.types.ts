 export interface Product {
   id: number | string;
  title: string;
   price: number;
   description: string;
   category: string;
   image: string;
    rating?: {
    rate: number;
    count: number;
  };
};


export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

