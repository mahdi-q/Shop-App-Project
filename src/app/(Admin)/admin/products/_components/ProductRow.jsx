import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

function ProductRow({ product, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td whitespace-nowrap">{product.title}</td>

      <td className="table__td whitespace-nowrap">{product.category.title}</td>

      <td className="table__td font-bold">
        {toPersianNumbersWithComma(product.price)}
      </td>

      <td className="table__td">
        <div className="flex items-center justify-center">
          <span className="badge badge--success w-12 rounded-lg">
            {toPersianNumbers(product.discount)} %
          </span>
        </div>
      </td>

      <td className="table__td font-bold">
        {toPersianNumbersWithComma(product.offPrice)}
      </td>

      <td className="table__td font-bold">
        {toPersianNumbers(product.countInStock)}
      </td>

      <td className="table__td">
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/products/${product._id}`}>
            <MdRemoveRedEye className="h-5 w-5 text-primary-900" />
          </Link>

          <button>
            <CiEdit className="h-5 w-5 text-success" />
          </button>

          <button>
            <IoTrashOutline className="h-5 w-5 text-error" />
          </button>
        </div>
      </td>
    </tr>
  );
}
export default ProductRow;
