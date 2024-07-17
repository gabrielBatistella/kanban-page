'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";

type FilterSelectProps = {
  label: string;
  options: { value: string, label: string }[];
  paramName: string;
}

export default function FilterSelect(props: FilterSelectProps) {
  const selectId = `filter-select-${props.paramName}`;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterValue = searchParams.get(props.paramName);

  const handleOnChangeSelection = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== "") {
      params.set(props.paramName, value);
    } else {
      params.delete(props.paramName);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="group w-full relative flex items-center rounded-md border border-tertiary">
      <label htmlFor={selectId} className="absolute -top-2 left-2 px-1 text-xs text-tertiary bg-background group-focus-within:text-primary">
        {props.label}
      </label>

      <select
        id={selectId}
        onChange={(event) => handleOnChangeSelection(event.target.value)}
        defaultValue={filterValue ?? ""}
        className={`flex-1 pt-2.5 pb-2 px-3 text-sm ${filterValue ? "text-primary" : "text-tertiary"} rounded-md bg-transparent cursor-pointer`}
      >
        <option value={""} className="text-md text-primary bg-background">Todos</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value} className="text-md text-primary bg-background">{option.label}</option>
        ))}
      </select>
    </div>
  );
}
