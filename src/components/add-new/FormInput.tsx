'use client';

type FormInputProps = {
  label: string;
  placeholder: string;
  fieldName: string;
  type?: string;
}

export default function FormInput(props: FormInputProps) {
  const inputId = `form-input-${props.fieldName}`;

  return (
    <div className="group w-full relative flex items-center rounded-md border border-tertiary">
      <label htmlFor={inputId} className="absolute -top-2 left-2 px-1 text-xs text-tertiary bg-background group-focus-within:text-primary">
        {props.label}
      </label>

      <input
        id={inputId}
        name={props.fieldName}
        placeholder={props.placeholder}
        type={props.type}
        defaultValue={""}
        required
        className="flex-1 pt-2.5 pb-2 px-4 text-sm text-primary rounded-md bg-transparent"
      />
    </div>
  );
}
