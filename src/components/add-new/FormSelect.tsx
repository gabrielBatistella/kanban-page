'use client';

type FormSelectProps = {
  label: string;
  options: { value: string, label: string }[];
  fieldName: string;
}

export default function FormSelect(props: FormSelectProps) {
  const selectId = `form-select-${props.fieldName}`;

  return (
    <div className="group w-full relative flex items-center rounded-md border border-tertiary">
      <label htmlFor={selectId} className="absolute -top-2 left-2 px-1 text-xs text-tertiary bg-background group-focus-within:text-primary">
        {props.label}
      </label>

      <select
        id={selectId}
        name={props.fieldName}
        defaultValue={""}
        required
        className={`flex-1 pt-2.5 pb-2 px-3 text-sm rounded-md bg-transparent cursor-pointer`}
      >
        <option value={""} hidden className="text-md text-primary bg-background">Selecione</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value} className="text-md text-primary bg-background">{option.label}</option>
        ))}
      </select>
    </div>
  );
}
