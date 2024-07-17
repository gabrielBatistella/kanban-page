'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-32 flex justify-center items-center py-2 px-4 rounded-md bg-primary cursor-pointer hover:bg-secondary"
    >
      <span className="text-md text-background whitespace-nowrap">
        Adicionar
      </span>
    </button>
  );
}