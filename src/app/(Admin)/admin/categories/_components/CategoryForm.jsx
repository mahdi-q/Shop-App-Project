"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextarea from "@/ui/RHFTextarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAddCategory from "../_hooks/useAddCategory";
import useEditCategory from "../_hooks/useEditCategory";

const schema = yup
  .object({
    title: yup
      .string()
      .required("عنوان الزامی است.")
      .min(3, "عنوان باید حداقل 3 کاراکتر باشد.")
      .max(30, "عنوان نباید بیشتر از 30 کاراکتر باشد."),

    englishTitle: yup
      .string()
      .required("عنوان انگلیسی الزامی است.")
      .min(3, "عنوان انگلیسی باید حداقل 3 کاراکتر باشد.")
      .max(30, "عنوان انگلیسی نباید بیشتر از 30 کاراکتر باشد.")
      .matches(
        /^[^\u0600-\u06FF\u06F0-\u06F9]+$/,
        "کاراکتر فارسی یا عدد فارسی مجاز نیست.",
      ),

    type: yup
      .object()
      .typeError("نوع دسته‌بندی الزامی است.")
      .required("نوع دسته‌بندی الزامی است."),

    description: yup
      .string()
      .required("توضیحات الزامی است.")
      .trim()
      .min(10, "توضیحات باید حداقل 10 کاراکتر باشد."),
  })
  .required();

function CategoryForm({ initialData = {}, isUpdating = false }) {
  const router = useRouter();
  const { isAdding, addCategory } = useAddCategory();
  const { isEditing, editCategory } = useEditCategory(initialData?._id);

  const initialValues = isUpdating
    ? {
        title: initialData?.title,
        englishTitle: initialData?.englishTitle,
        type: {
          value: initialData.type,
          label: initialData.type === "product" && "محصول",
        },
        description: initialData?.description,
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

      //  Handle edit category
      editCategory(
        { id: initialData._id, data: { ...values, type: values.type.value } },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/categories");
          },
        },
      );
    } else {
      //  Handle add category
      addCategory(
        { ...values, type: values.type.value },
        {
          onSuccess: () => {
            reset();
            router.push("/admin/categories");
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
        label="عنوان انگلیسی"
        register={register}
        errors={errors}
        name="englishTitle"
        dir="ltr"
        isRequired
      />

      <RHFSelect
        label="نوع"
        control={control}
        placeholder="یکی از گزینه ها را انتخاب کنید."
        name="type"
        options={[{ value: "product", label: "محصول" }]}
        isRequired
      />

      <RHFTextarea
        label="توضیحات"
        register={register}
        errors={errors}
        name="description"
        rows={5}
        className="col-span-1 sm:col-span-2 xl:col-span-3"
        isRequired
      />

      <button
        type="submit"
        disabled={isAdding || isEditing}
        className={`btn ${isAdding || isEditing ? "btn--outline" : "btn--primary"} mt-2 self-center justify-self-start px-6 sm:col-span-2 sm:px-8 lg:px-14 xl:col-span-3`}
      >
        {isAdding || isEditing ? <SvgLoaderComponent /> : "ثبت دسته‌بندی‌"}
      </button>
    </form>
  );
}
export default CategoryForm;
