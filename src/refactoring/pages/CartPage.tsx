import { CartItem, Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks/index.ts";
import { CartList } from "../components/CartList.tsx";
import { ColumnLayout } from "../components/ColumnLayout.tsx";
import { CouponSelector } from "../components/CouponSelector.tsx";
import { OrderSummary } from "../components/OrderSummary.tsx";
import { ProductList } from "../components/ProductList.tsx";

export const CartPage = () => {
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

  // const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
  //   calculateTotal();

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
        <ProductList />
        <div>
          <CartList />
          <CouponSelector />
          <OrderSummary />
        </div>
      </ColumnLayout>
    </div>
  );
};
