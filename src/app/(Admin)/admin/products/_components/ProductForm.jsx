"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
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
import ButtonIcon from "@/ui/ButtonIcon";
import { useEffect, useState } from "react";
import { imageUrlToFile } from "@/utils/fileFormatter";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import FileInput from "@/ui/FileInput";

function ProductForm({ initialData = {}, isUpdating = false }) {
  const [imageLinkUrl, setImageLinkUrl] = useState(
    initialData.imageLinkUrl || null,
  );

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
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(ProductSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (initialData.imageLinkUrl) {
      async function changeImage() {
        const file = await imageUrlToFile(initialData.imageLinkUrl);
        setValue("imageLink", file);
      }

      changeImage();
    }
  }, [initialData]);

  const onSubmit = (values) => {
    const formData = new FormData();

    for (const key in values) {
      if (key === "category") {
        formData.append("category", values.category.value);
      } else if (key === "tags") {
        const tagsArray = Array.isArray(values.tags)
          ? values.tags
          : [values.tags];

        tagsArray.forEach((tag) => {
          formData.append("tags", tag);
        });
      } else {
        formData.append(key, values[key]);
      }
    }

    if (isUpdating) {
      if (!isDirty) return toast.error("لطفا حداقل یک فیلد را تغییر دهید.");

      editProduct(
        {
          product: formData,
          id: initialData._id,
        },
        {
          onSuccess: () => {
            reset();
            setImageLinkUrl(null);
            router.push("/admin/products");
          },
        },
      );
    } else {
      addProduct(formData, {
        onSuccess: () => {
          reset();
          setImageLinkUrl(null);
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

      <div className="flex flex-col gap-2">
        <div className="">
          <span className="text-secondary-700">عکس محصول</span>
          <span className="text-error">*</span>
        </div>

        <Controller
          name="imageLink"
          control={control}
          rules={{ required: "عکس محصول الزامی است." }}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب عکس محصول"
              name="imageLink"
              value={value?.imageLink || ""}
              errors={errors}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setImageLinkUrl(URL.createObjectURL(file));
                event.target.value = null;
              }}
              {...rest}
            />
          )}
        />

        {imageLinkUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              fill
              alt="product-image"
              src={imageLinkUrl}
              className="object-cover object-center"
            />

            <ButtonIcon
              varient="danger"
              className="absolute bottom-2 left-2"
              onClick={() => {
                setImageLinkUrl(null);
                setValue("coverImage", null);
              }}
            >
              <IoTrashOutline />
            </ButtonIcon>
          </div>
        )}
      </div>

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
