import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useCreateQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(name, value);

      return newParams.toString();
    },
    [searchParams],
  );

  return createQueryString;
}
