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
import toast from "react-hot-toast";
import useEditProduct from "../_hooks/useEditProduct";

const schema = yup
  .object({
    title: yup
      .string()
      .required("عنوان الزامی است.")
      .min(3, "عنوان باید حداقل 3 کاراکتر باشد.")
      .max(30, "عنوان نباید بیشتر از 30 کاراکتر باشد."),

    brand: yup.string().required("برند الزامی است.").trim(),

    category: yup
      .object()
      .typeError("دسته‌بندی الزامی است.")
      .required("دسته‌بندی الزامی است."),

    price: yup
      .string()
      .required("قیمت الزامی است.")
      .matches(/^\d+$/, "قیمت باید عدد باشد."),

    discount: yup
      .string()
      .required("تخفیف الزامی است.")
      .matches(/^\d+$/, "تخفیف باید عدد باشد.")
      .test("max-100", "تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد.", (value) => {
        return value ? Number(value) <= 100 : false;
      }),

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

function ProductForm({ initialData = {}, isUpdating = false }) {
  const router = useRouter();
  const { isAdding, addProduct } = useAddProduct();
  const { isEditing, editProduct } = useEditProduct(initialData._id);
  const { isLoading, categories } = useGetCategories();

  const initialValues = isUpdating
    ? {
        title: initialData.title,
        brand: initialData.brand,
        category: {
          value: initialData.category._id,
          label: initialData.category.title,
        },
        price: initialData.price,
        discount: initialData.discount,
        offPrice: initialData.offPrice,
        slug: initialData.slug,
        countInStock: initialData.countInStock,
        imageLink: initialData.imageLink,
        tags: initialData.tags,
        description: initialData.description,
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

      editProduct(
        {
          product: { ...values, category: values.category.value },
          id: initialData._id,
        },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/products");
          },
        },
      );
    } else {
      addProduct(
        { ...values, category: values.category.value },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/products");
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
        isRequired
      />

      <RHFSelect
        label="دسته‌بندی"
        control={control}
        name="category"
        placeholder="یکی از دسته‌بندی ها را انتخاب کنید."
        options={
          !isLoading
            ? categories.map((category) => {
                return { value: category._id, label: category.title };
              })
            : []
        }
        isRequired
      />

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
        disabled={isAdding || isEditing}
        className={`btn ${isAdding || isEditing ? "btn--outline" : "btn--primary"} mt-2 self-center justify-self-start px-6 sm:col-span-2 sm:px-8 lg:px-14 xl:col-span-3`}
      >
        {isAdding || isEditing ? <SvgLoaderComponent /> : "ثبت محصول"}
      </button>
    </form>
  );
}
export default ProductForm;
