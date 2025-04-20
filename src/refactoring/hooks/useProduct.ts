import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (newProduct: Product) => {
    setProducts((currentProducts) => {
      const existingProduct = currentProducts.findIndex(
        (product) => product.id === newProduct.id
      );

      if (existingProduct > -1) {
        const updateProduct = [...currentProducts];
        updateProduct[existingProduct] = newProduct;
        return updateProduct;
      }
      return currentProducts;
    });
  };

  const addProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
