import CartInvoice from "./_components/CartInvoice";
import CartItems from "./_components/CartItems";

export const metadata = {
  title: "سبد خرید",
  description: "صفحه سبد خرید اپلیکیشن فروشگاهی",
};

function CartPage() {
  return (
    <div className="mb-32 grid w-full grid-cols-12 px-4 md:px-8 lg:gap-8">
      <div className="col-span-12 lg:col-span-8">
        <CartItems />
      </div>

      <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0">
        <CartInvoice />
      </div>
    </div>
  );
}
export default CartPage;
