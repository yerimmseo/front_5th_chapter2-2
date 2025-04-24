import { CartItem as Item } from "../../../../types";
import { useCartContext } from "../../../contexts/CartContext";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCartContext();

  const getAppliedDiscount = (item: Item) => {
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
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          const appliedDiscount = getAppliedDiscount(item);

          return <CartItem item={item} appliedDiscount={appliedDiscount} />;
        })}
      </div>
    </>
  );
};
