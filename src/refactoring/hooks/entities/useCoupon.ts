import { useState } from "react";
import { Coupon } from "../../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    // ...coupons, newCoupon <= 직접 상태를 참조하면 잠재적 문제가 발생할 수 있음
    // 클로저에 의해 캡처된 coupons 값을 사용하므로, 여러 상태 업데이트가 짧은 시간에 연속으로 발생할 경우 최신 상태를 참조하지 못할 수 있다.
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
