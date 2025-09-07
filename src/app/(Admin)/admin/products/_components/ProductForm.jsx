"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import RHFSelect from "@/ui/RHFSelect";
import RHFTagInput from "@/ui/RHFTagInput";
import RHFTextarea from "@/ui/RHFTextarea";
import useAddProduct from "../_hooks/useAddProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useEditProduct from "../_hooks/useEditProduct";
import { ProductSchema } from "@/constants/validationSchemas";
import { useGetCategories } from "@/hooks/useGetCategories";

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
    resolver: yupResolver(ProductSchema),
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
