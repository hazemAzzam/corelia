"use client";

import { type ComponentProps } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ControlledCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
} & ComponentProps<typeof Checkbox>;

const ControlledCheckbox = <T extends FieldValues>({
  className,
  label,
  name,
  containerClassName,
  ...props
}: ControlledCheckboxProps<T>) => {
  const { control, formState } = useFormContext<T>();
  return (
    <div className={cn("flex items-center space-x-2", containerClassName)}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Checkbox
              className={cn(className)}
              id={name}
              data-slot="checkbox"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={!!error}
              disabled={formState.disabled || props.disabled}
              {...props}
            />
            {!!label && (
              <Label
                htmlFor={name}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  error && "text-destructive"
                )}
              >
                {label}
              </Label>
            )}
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export { ControlledCheckbox };
