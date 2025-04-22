import { Product } from "../../types";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getRemainingStock: (product: Product) => number;
};

export const ProductList = ({
  products,
  onAddToCart,
  getRemainingStock,
}: ProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product, index) => {
          const remainingStock = getRemainingStock(product);

          return (
            <ProductCard
              product={product}
              remainingStock={remainingStock}
              onAddToCart={onAddToCart}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
