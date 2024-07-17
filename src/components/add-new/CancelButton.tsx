'use client';

import { useRouter } from "next/navigation";

export default function CancelButton() {
  const { back } = useRouter();

  return (
    <button
      type="button"
      onClick={() => back()}
      className="w-32 flex justify-center items-center py-2 px-4 rounded-md bg-secondary cursor-pointer hover:bg-tertiary"
    >
      <span className="text-md text-background whitespace-nowrap">
        Cancelar
      </span>
    </button>
  );
}