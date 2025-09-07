import * as yup from "yup";

export const SendOtpSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("شماره موبایل الزامی است")
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  })
  .required();

export const CompleteProfileSchema = yup
  .object({
    userName: yup
      .string()
      .required("نام کاربری الزامی است")
      .min(5, "نام کاربری باید حداقل ۵ کاراکتر باشد"),
    email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),
  })
  .required();

export const UserInfoSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("شماره موبایل الزامی است.")
      .matches(/^\d+$/, "شماره موبایل باید عدد باشد.")
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست."),
    email: yup
      .string()
      .required("ایمیل الزامی است.")
      .email("ایمیل معتبر نیست."),
    name: yup
      .string()
      .required("نام کاربری الزامی است.")
      .min(5, "نام کاربری باید حداقل ۵ کاراکتر باشد."),
  })
  .required();

export const ProductSchema = yup
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

export const CategorySchema = yup
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

export const CouponSchema = yup
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
