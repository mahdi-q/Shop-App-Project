"use client";

import { useRouter } from "next/navigation";

function BackButton({ children }) {
  const { back } = useRouter();

  return (
    <button onClick={back} className="btn">
      {children}
    </button>
  );
}
export default BackButton;
