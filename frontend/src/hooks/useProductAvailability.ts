import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { Product } from "../types/product.types";

export const useProductAvailability = () => {
  const products = useSelector((state: any) => state.products.products, {
    equalityFn: (a, b) => a === b,
  });

  const availabilityMap = useMemo(() => {

    const map = new Map<string, boolean>();

    products.forEach((product: Product) => {
      const id = String(product._id || product.id);
      if (id) {
        map.set(id, true);
      }
    });
    return map;
  }, [products]);

  
  const isAvailable = (itemId: string): boolean => {
    return availabilityMap.has(itemId);
  };

  return { availabilityMap, isAvailable };
};
