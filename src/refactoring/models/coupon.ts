import { Coupon } from "../../types";

export const createNewCoupon = (): Coupon => ({
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
});
