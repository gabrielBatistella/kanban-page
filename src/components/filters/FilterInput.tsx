'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type FilterInputProps = {
  label: string;
  placeholder: string;
  paramName: string;
  type?: string;
}

export default function FilterInput(props: FilterInputProps) {
  const inputId = `filter-input-${props.paramName}`;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterValue = searchParams.get(props.paramName);

  const handleOnChangeInput = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "") {
      params.set(props.paramName, value);
    } else {
      params.delete(props.paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className="group w-full relative flex items-center rounded-md border border-secondary">
      <label htmlFor={inputId} className="absolute -top-2 left-2 px-1 text-xs text-secondary bg-background group-focus-within:text-primary">
        {props.label}
      </label>

      <input
        id={inputId}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(event) => handleOnChangeInput(event.target.value)}
        defaultValue={filterValue ?? ""}
        className="flex-1 pt-2.5 pb-2 px-4 text-sm text-primary rounded-md bg-transparent"
      />
    </div>
  );
}
