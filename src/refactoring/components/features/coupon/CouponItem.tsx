import { Coupon } from "../../../../types";
import { localizedNumberFormat } from "../../../utils/formatting";

type CouponItemProps = {
  coupon: Coupon;
};

export const CouponItem = ({ coupon, ...props }: CouponItemProps) => {
  return (
    <div className="bg-gray-100 p-2 rounded" {...props}>
      {coupon.name} ({coupon.code}):
      {coupon.discountType === "amount"
        ? `${localizedNumberFormat(coupon.discountValue)}원`
        : `${coupon.discountValue}%`}{" "}
      할인
    </div>
  );
};
