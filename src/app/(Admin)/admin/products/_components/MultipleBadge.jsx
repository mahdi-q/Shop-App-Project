import useGetUser from "@/hooks/useGetUser";
import Link from "next/link";

const MultipleBadge = ({ userId }) => {
  const { isLoading, user } = useGetUser(userId);

  if (isLoading) return null;

  return (
    user && (
      <Link href={`/admin/users/${user._id}`}>
        <span className="badge badge--primary text-base">
          {user?.name ?? "نامشخص"}
        </span>
      </Link>
    )
  );
};

export default MultipleBadge;
