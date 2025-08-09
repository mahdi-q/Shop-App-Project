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

      <div className="col-span-12 bg-success lg:col-span-4">Cart Summery</div>
    </div>
  );
}
export default CartPage;
