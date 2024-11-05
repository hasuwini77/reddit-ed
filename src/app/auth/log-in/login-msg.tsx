"use client";

import { useSearchParams } from "next/navigation";

export default function LoginMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) return null;

  return (
    <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
      <strong>Notice:</strong> {message}
    </p>
  );
}
