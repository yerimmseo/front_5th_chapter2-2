import { useProductContext } from "../../../contexts/ProductContext";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};
