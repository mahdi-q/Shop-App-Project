import { categoriesTHeads } from "@/constants/tableHeads";
import CategoryRow from "./CategoryRow";

function CategoriesTable({ categories }) {
  return (
    <div className="table__layout">
      <table>
        <thead>
          <tr>
            {categoriesTHeads.map((item) => (
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
          {categories.map((category, index) => (
            <CategoryRow key={index} category={category} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CategoriesTable;
