import ProductCard from "./ProductCard";

function ProductsList({ products }) {
  if (!products || products.length <= 0)
    return (
      <div className="flex w-full items-center justify-center text-lg font-bold">
        محصولی یافت نشد.
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
export default ProductsList;
