import { toPersianNumbers } from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdRemoveRedEye } from "react-icons/md";

function CategoryRow({ category, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td whitespace-nowrap">{category.title}</td>

      <td className="table__td truncate whitespace-nowrap">
        {category.description}
      </td>

      <td className="table__td whitespace-nowrap">{category.englishTitle}</td>

      <td className="table__td">
        <div className="flex items-center justify-center">
          <span className="badge badge--secondary rounded-lg">
            {toPersianNumbers(category.type)}
          </span>
        </div>
      </td>

      <td className="table__td">{toLocalDate(category.createdAt)}</td>

      <td className="table__td">
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/categories/${category._id}`}>
            <MdRemoveRedEye className="h-5 w-5 text-primary-900" />
          </Link>

          <Link href={`/admin/categories/edit/${category._id}`}>
            <CiEdit className="h-5 w-5 text-success" />
          </Link>

          {/* <DeleteCategoryModal id={category._id} title={category.title} /> */}
        </div>
      </td>
    </tr>
  );
}
export default CategoryRow;
