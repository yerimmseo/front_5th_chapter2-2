import { ReactNode } from "react";
import { ProductProvider } from "./contexts/ProductContext";
import { CouponProvider } from "./contexts/CouponContext";
import { CartProvider } from "./contexts/CartContext";
import { initialProducts } from "./constants/initial-data/products";
import { initialCoupons } from "./constants/initial-data/coupons";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProductProvider initialProducts={initialProducts}>
      <CouponProvider initialCoupons={initialCoupons}>
        <CartProvider>{children}</CartProvider>
      </CouponProvider>
    </ProductProvider>
  );
};
