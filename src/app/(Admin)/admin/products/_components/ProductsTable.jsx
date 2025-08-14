import { productsTHeads } from "@/constants/tableHeads";
import ProductRow from "./ProductRow";

function ProductsTable({ products }) {
  return (
    <div className="table__layout">
      <table>
        <thead>
          <tr>
            {productsTHeads.map((item) => (
              <th key={item.id} className="table__th whitespace-nowrap">
                <span>{item.label}</span>
                {item.unit && (
                  <span className="mr-1 text-xs font-bold">({item.unit})</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <ProductRow key={index} product={product} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductsTable;
