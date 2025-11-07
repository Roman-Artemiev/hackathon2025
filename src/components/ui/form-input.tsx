"use client";

import React from "react";
import { Input } from "./input";
import { useFormContext } from "react-hook-form";
import { cx } from "class-variance-authority";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  isWithCross?: boolean;
  className?: string;
  classNameInput?: string;
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  description,
  classNameInput,
  ...props
}) => {
  const {
    register,
  } = useFormContext();

  return (
    <div className={className}>
      {label && (
        <p className="font-medium text-sm mb-1">
          {label}
        </p>
      )}
      <div className="relative">
        <Input
          className={cx("h-10 text-sm", classNameInput)}
          {...register(name, { valueAsNumber: props.type === "number" })}
          {...props}
        />

      </div>

      {description && (
        <p className="max-w-full text-sm mt-2 mb-1 text-gray-400 text-wrap break-words">
          {description}
        </p>
      )}
    </div>
  );
};
