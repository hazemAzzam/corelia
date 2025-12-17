"use client";

import { useState, type ComponentProps } from "react";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  containerClassName?: string;
  showError?: boolean;
  options?: { value: string; label: string }[];
} & ComponentProps<typeof Input>;


const ControlledInput = <T extends FieldValues>({
  className,
  type,
  label,
  name,
  containerClassName,
  showError = false,
  ...props
}: ControlledInputProps<T>) => {
  const { control } = useFormContext<T>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className={cn("flex-1 space-y-2", containerClassName)}>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let val = e.target.value;
            field.onChange(val);
          };

          return (
            <div className="relative">
              <Input
                {...field}
                {...props}
                id={name}
                aria-invalid={!!error}
                type={inputType}
                className={cn("p-7 border-gray-400 rounded-sm", className)}
                value={field.value ?? ""}
                onChange={handleChange}
              />

              {type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}

              {showError && !!error && (
                <p className="text-destructive text-sm">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export { ControlledInput };

