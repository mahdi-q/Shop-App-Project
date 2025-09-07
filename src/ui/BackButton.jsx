"use client";

import { useRouter } from "next/navigation";

function BackButton({ children, className = "" }) {
  const { back } = useRouter();

  return (
    <button onClick={back} className={`btn ${className}`}>
      {children}
    </button>
  );
}
export default BackButton;
