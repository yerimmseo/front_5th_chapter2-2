import { CartItem as Item } from "../../types";
import { CartItem } from "./CartItem";

type CartListProps = {
  cart: Item[];
  getAppliedDiscount: (item: Item) => number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
};
export const CartList = ({
  cart,
  getAppliedDiscount,
  updateQuantity,
  removeFromCart,
}: CartListProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          const appliedDiscount = getAppliedDiscount(item);

          return (
            <CartItem
              item={item}
              appliedDiscount={appliedDiscount}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
    </>
  );
};
