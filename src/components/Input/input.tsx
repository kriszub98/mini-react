import React, { forwardRef, useId } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

type InputVariant = "top" | "floating";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "defaultValue"
> & {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  label: string;
  variant?: InputVariant;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperText?: string;
};

function FormInputInner<TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    name,
    control,
    rules,
    label,
    variant = "top",
    type = "text",
    containerClassName,
    labelClassName,
    inputClassName,
    errorClassName,
    helperText,
    disabled,
    placeholder,
    ...rest
  } = props;

  const reactId = useId();
  const inputId = rest.id ?? `${name}-${reactId}`;
  const helperTextId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const hasValue =
    field.value !== undefined &&
    field.value !== null &&
    String(field.value).length > 0;

  const describedBy = cn(
    helperText ? helperTextId : undefined,
    error ? errorId : undefined,
  );

  if (variant === "floating") {
    return (
      <div className={cn("w-full", containerClassName)}>
        <div className="relative">
          <input
            {...rest}
            {...field}
            ref={(node) => {
              field.ref(node);
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type={type}
            disabled={disabled}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={cn(
              "peer w-full rounded-xl border bg-white px-4 pb-3 pt-6 text-sm outline-none transition",
              "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
              error && "border-red-500 focus:border-red-600 focus:ring-red-100",
              inputClassName,
            )}
          />

          <label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-sm text-slate-500 transition-all",
              "peer-focus:top-2 peer-focus:left-3 peer-focus:translate-y-0 peer-focus:text-xs",
              "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
              disabled && "bg-slate-100",
              error && "text-red-600",
              hasValue && "top-2 left-3 translate-y-0 text-xs",
              labelClassName,
            )}
          >
            {label}
          </label>
        </div>

        {helperText && !error && (
          <p id={helperTextId} className="mt-1 text-xs text-slate-500">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className={cn("mt-1 text-xs text-red-600", errorClassName)}
          >
            {error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      <label
        htmlFor={inputId}
        className={cn(
          "mb-1.5 block text-sm font-medium text-slate-800",
          disabled && "text-slate-400",
          error && "text-red-600",
          labelClassName,
        )}
      >
        {label}
      </label>

      <input
        {...rest}
        {...field}
        ref={(node) => {
          field.ref(node);
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        id={inputId}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        className={cn(
          "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
          "border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
          "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
          error && "border-red-500 focus:border-red-600 focus:ring-red-100",
          inputClassName,
        )}
      />

      {helperText && !error && (
        <p id={helperTextId} className="mt-1 text-xs text-slate-500">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className={cn("mt-1 text-xs text-red-600", errorClassName)}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}

export const FormInput = forwardRef(FormInputInner) as <
  TFieldValues extends FieldValues,
>(
  props: FormInputProps<TFieldValues> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
) => ReturnType<typeof FormInputInner>;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormInput } from "./FormInput";

// const schema = z.object({
//   firstName: z.string().min(2, "Minimum 2 znaki"),
//   email: z.string().email("Niepoprawny email"),
// });

// type FormValues = z.infer<typeof schema>;

// export default function ExampleForm() {
//   const { control, handleSubmit } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: "",
//       email: "",
//     },
//     mode: "onBlur",
//   });

//   const onSubmit = (data: FormValues) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
//       <FormInput<FormValues>
//         name="firstName"
//         control={control}
//         label="First name"
//         variant="top"
//         placeholder="Enter first name"
//       />

//       <FormInput<FormValues>
//         name="email"
//         control={control}
//         label="Email"
//         type="email"
//         variant="floating"
//       />

//       <button
//         type="submit"
//         className="rounded-xl bg-slate-900 px-4 py-2 text-white"
//       >
//         Submit
//       </button>
//     </form>
//   );
// }
