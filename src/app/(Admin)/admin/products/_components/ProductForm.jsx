"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import RHFSelect from "@/ui/RHFSelect";
import RHFTagInput from "@/ui/RHFTagInput";
import RHFTextarea from "@/ui/RHFTextarea";
import useGetCategories from "@/hooks/useGetCategories";
import useAddProduct from "../_hooks/useAddProduct";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    title: yup
      .string()
      .required("عنوان الزامی است.")
      .min(3, "عنوان باید حداقل 3 کاراکتر باشد.")
      .max(30, "عنوان نباید بیشتر از 30 کاراکتر باشد."),

    brand: yup.string().required("برند الزامی است.").trim(),

    category: yup.string().required("دسته‌بندی الزامی است."),

    price: yup
      .string()
      .required("قیمت الزامی است.")
      .matches(/^\d+$/, "قیمت باید عدد باشد."),

    discount: yup
      .string()
      .required("تخفیف الزامی است.")
      .matches(/^\d+$/, "تخفیف باید عدد باشد."),

    offPrice: yup
      .string()
      .required("قیمت نهایی الزامی است.")
      .matches(/^\d+$/, "قیمت نهایی باید عدد باشد."),

    slug: yup.string().required("اسلاگ الزامی است.").trim(),

    countInStock: yup
      .string()
      .required("موجودی الزامی است.")
      .matches(/^\d+$/, "موجودی باید عدد باشد.")
      .test("not-zero", "موجودی نمی‌تواند ۰ باشد.", (value) => value !== "0"),

    imageLink: yup.string().required("ادرس‌ عکس الزامی است.").trim(),

    tags: yup
      .array()
      .of(yup.string().trim())
      .required("تگ‌ها الزامی است.")
      .min(1, "حداقل یک تگ باید وارد شود.")
      .max(20, "تگ‌ها نمی‌توانند بیشتر از 20 ایتم باشند."),

    description: yup
      .string()
      .required("توضیحات الزامی است.")
      .trim()
      .min(10, "توضیحات باید حداقل 10 کاراکتر باشد."),
  })
  .required();

function ProductForm({ initialData, isUpdating = false }) {
  const router = useRouter();
  const { isAdding, addProduct } = useAddProduct();
  const { isLoading, categories } = useGetCategories();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    if (isUpdating) {
      // Handle update logic here
    } else {
      addProduct(values, {
        onSuccess: () => {
          reset();
          router.push("/admin/products");
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formLayout grid w-full grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <RHFTextField
        label="عنوان"
        register={register}
        errors={errors}
        name="title"
        isRequired
      />

      <RHFTextField
        label="برند"
        register={register}
        errors={errors}
        name="brand"
        dir="ltr"
        isRequired
      />

      {!isLoading && (
        <RHFSelect
          label="دسته‌بندی"
          register={register}
          errors={errors}
          name="category"
          options={categories.map((category) => {
            return { value: category._id, label: category.title };
          })}
          isRequired
        />
      )}

      <RHFTextField
        label="قیمت"
        register={register}
        errors={errors}
        name="price"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="تخفیف(درصد)"
        register={register}
        errors={errors}
        name="discount"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="قیمت نهایی"
        register={register}
        errors={errors}
        name="offPrice"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="اسلاگ"
        register={register}
        errors={errors}
        name="slug"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="موجودی"
        register={register}
        errors={errors}
        name="countInStock"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="لینک عکس"
        register={register}
        errors={errors}
        name="imageLink"
        dir="ltr"
        isRequired
      />

      <RHFTagInput
        label="تگ‌ها"
        control={control}
        errors={errors}
        name="tags"
        isRequired
      />

      <RHFTextarea
        label="توضیحات"
        register={register}
        errors={errors}
        name="description"
        rows={5}
        className="col-span-1 xl:col-span-2"
        isRequired
      />

      <button
        type="submit"
        disabled={isAdding}
        className={`btn ${isAdding ? "btn--outline" : "btn--primary"} mt-2 self-center justify-self-start px-6 sm:col-span-2 sm:px-8 lg:px-14 xl:col-span-3`}
      >
        {isAdding ? <SvgLoaderComponent /> : "ثبت محصول"}
      </button>
    </form>
  );
}
export default ProductForm;
