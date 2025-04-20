import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const applicableDiscount = item.product.discounts
    .filter((rule) => item.quantity >= rule.quantity)
    .sort((a, b) => b.quantity - a.quantity)[0];

  const discountRate = applicableDiscount?.rate ?? 0;

  const totalPrice = item.product.price * item.quantity;
  const discountAmount = totalPrice * discountRate;

  return totalPrice - discountAmount;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const applicableDiscount = item.product.discounts
    .filter((rule) => item.quantity >= rule.quantity)
    .sort((a, b) => b.quantity - a.quantity)[0];

  const discountRate = applicableDiscount?.rate ?? 0;

  return discountRate;
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  // 각 아이템 수량 별 할인 적용
  const pricedCartItems = cart.map((item) => {
    const totalPrice = item.product.price * item.quantity;

    const applicableDiscount = item.product.discounts
      .filter((rule) => item.quantity >= rule.quantity)
      .sort(
        (a, b) => b.quantity - a.quantity // 가장 높은 수량의 할인율 적용
      )[0];

    const discountRate = applicableDiscount?.rate ?? 0;
    const discountAmount = totalPrice * discountRate;

    return { totalPrice, discountAmount };
  });

  const totalBeforeDiscount = pricedCartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const productDiscount = pricedCartItems.reduce(
    (sum, item) => sum + item.discountAmount,
    0
  );

  const afterProductDiscounts = totalBeforeDiscount - productDiscount;

  // 쿠폰 할인 계산
  const couponDiscount = selectedCoupon
    ? selectedCoupon.discountType === "amount"
      ? Math.min(selectedCoupon.discountValue, afterProductDiscounts)
      : (afterProductDiscounts * selectedCoupon.discountValue) / 100
    : 0;

  const totalDiscount = productDiscount + couponDiscount;

  const totalAfterDiscount = totalBeforeDiscount - totalDiscount;

  return {
    totalBeforeDiscount,
    totalDiscount,
    totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const existingCartItemIndex = cart.findIndex(
    (item) => item.product.id === productId
  );

  if (existingCartItemIndex === -1) {
    return cart;
  }

  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  const productStock = cart[existingCartItemIndex].product.stock;

  if (newQuantity > productStock) {
    newQuantity = productStock;
  }

  const updatedCart = [...cart];
  updatedCart[existingCartItemIndex] = {
    ...updatedCart[existingCartItemIndex],
    quantity: newQuantity,
  };

  return updatedCart;
};
