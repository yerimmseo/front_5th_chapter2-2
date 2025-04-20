// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    // 함수형 업데이트
    setCart((currentCart) => {
      const existingCartItemIndex = currentCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingCartItemIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          quantity: updatedCart[existingCartItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCart((currentCart) => {
        const existingCartItemIndex = currentCart.findIndex(
          (item) => item.product.id === productId
        );

        if (existingCartItemIndex > -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingCartItemIndex] = {
            ...updatedCart[existingCartItemIndex],
            quantity: newQuantity,
          };
          return updatedCart;
        }
        return currentCart;
      });
    } else {
      removeFromCart(productId);
    }
  };

  const applyCoupon = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalDiscount, totalAfterDiscount } =
      calculateCartTotal(cart, selectedCoupon);

    return {
      totalBeforeDiscount, // 할인 전 상품 금액
      totalDiscount, // 할인 금액
      totalAfterDiscount, // 최종 결제 금액
    };
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
