"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import toast from "react-hot-toast";
import RHFSelect from "@/ui/RHFSelect";
import RHFDatePicker from "@/ui/RHFDatePicker";
import useAddCoupon from "../_hooks/useAddCoupon";
import { useRouter } from "next/navigation";
import useGetProducts from "@/hooks/useGetProducts";
import useEditCoupon from "../_hooks/useEditCoupon";

const schema = yup
  .object({
    code: yup
      .string()
      .required("کد تخفیف الزامی است.")
      .min(5, "کد تخفیف باید حداقل ۵ کاراکتر باشد.")
      .max(30, "کد تخفیف نباید بیشتر از ۳۰ کاراکتر باشد."),

    amount: yup
      .string()
      .required("مقدار الزامی است.")
      .matches(/^\d+$/, "مقدار باید عدد باشد.")
      .test("not-zero", "مقدار نمی‌تواند ۰ باشد.", (value) => value !== "0")
      .when("type", (type, schema) => {
        if (type[0]?.value === "percent") {
          return schema.test(
            "max-100",
            "برای تخفیف درصدی مقدار نمی‌تواند بیشتر از ۱۰۰ باشد.",
            (value) => {
              if (!value) return false;
              return Number(value) <= 100;
            },
          );
        }
        return schema;
      }),

    usageLimit: yup
      .string()
      .required("ظرفیت الزامی است.")
      .matches(/^\d+$/, "ظرفیت باید عدد باشد.")
      .test("not-zero", "ظرفیت نمی‌تواند ۰ باشد.", (value) => value !== "0"),

    type: yup
      .object()
      .typeError("نوع تخفیف الزامی است.")
      .required("نوع تخفیف الزامی است."),

    productIds: yup
      .array()
      .of(yup.object().typeError("محصولات الزامی است."))
      .required("محصولات الزامی است.")
      .min(1, "حداقل یک محصول باید انتخاب شود."),

    expireDate: yup.date().required("تاریخ انقضا الزامی است."),
  })
  .required();

function CouponForm({ initialData = {}, isUpdating = false }) {
  const router = useRouter();
  const { isLoading, products } = useGetProducts();
  const { isAdding, addCoupon } = useAddCoupon();
  const { isEditing, editCoupon } = useEditCoupon();

  const initialValues = isUpdating
    ? {
        code: initialData.code,
        amount: initialData.amount,
        usageLimit: initialData.usageLimit,
        type: {
          value: initialData.type,
          label: initialData.type === "percent" ? "درصدی" : "قیمت‌ ثابت",
        },
        productIds: initialData.productIds.map((product) => {
          return { value: product._id, label: product.title };
        }),
        expireDate: initialData.expireDate,
      }
    : {};

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    if (isUpdating) {
      if (!isDirty) return toast.error("لطفا حداقل یک فیلد را تغییر دهید.");

      //  Handle edit coupon
      editCoupon(
        {
          id: initialData._id,
          data: {
            ...values,
            type: values.type.value,
            productIds: values.productIds.map((item) => item.value),
          },
        },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/coupons");
          },
        },
      );
    } else {
      //  Handle add coupon
      addCoupon(
        {
          ...values,
          type: values.type.value,
          productIds: values.productIds.map((item) => item.value),
        },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/coupons");
          },
        },
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formLayout grid w-full grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <RHFTextField
        label="کد تخفیف"
        register={register}
        errors={errors}
        name="code"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="مقدار"
        register={register}
        errors={errors}
        name="amount"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="ظرفیت"
        register={register}
        errors={errors}
        name="usageLimit"
        dir="ltr"
        isRequired
      />

      <RHFSelect
        label="نوع تخفیف"
        control={control}
        name="type"
        placeholder="یک گزینه را انتخاب کنید."
        options={[
          { value: "percent", label: "درصدی" },
          { value: "fixedProduct", label: "قیمت‌ ثابت" },
        ]}
        isRequired
      />

      <RHFSelect
        label="محصولات"
        control={control}
        name="productIds"
        placeholder="محصولات را انتخاب کنید."
        options={
          !isLoading
            ? products.map((product) => {
                return { value: product._id, label: product.title };
              })
            : []
        }
        isRequired
        isMulti
      />

      <RHFDatePicker
        label="تاریخ انقضا"
        control={control}
        name="expireDate"
        placeholder="تاریخ انقضا را انتخاب کنید."
        isRequired
      />

      <button
        type="submit"
        disabled={isAdding || isEditing}
        className={`btn ${isAdding || isEditing ? "btn--outline" : "btn--primary"} mt-2 self-center justify-self-start px-6 sm:col-span-2 sm:px-8 lg:px-14 xl:col-span-3`}
      >
        {isAdding || isEditing ? <SvgLoaderComponent /> : "ثبت کد تخفیف"}
      </button>
    </form>
  );
}
export default CouponForm;
