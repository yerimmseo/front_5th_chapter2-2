import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { CartList } from "./CartList.tsx";
import { ColumnLayout } from "./ColumnLayout.tsx";
import { CouponSelector } from "./CouponSelector.tsx";
import { OrderSummary } from "./OrderSummary.tsx";
import { ProductList } from "./ProductList.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
    return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <ColumnLayout>
        <ProductList
          products={products}
          onAddToCart={addToCart}
          getRemainingStock={getRemainingStock}
        />
        <div>
          <CartList
            cart={cart}
            getAppliedDiscount={getAppliedDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            applyCoupon={applyCoupon}
          />
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalDiscount={totalDiscount}
            totalAfterDiscount={totalAfterDiscount}
          />
        </div>
      </ColumnLayout>
    </div>
  );
};
