import * as React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export interface IInputFieldProps {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
}

export default function InputField(props: IInputFieldProps) {
  const { form, label, disabled, name } = props;
  const { errors } = form;
  console.log(errors);
  const hasError = errors && errors[name];
  const helperText = errors && errors[name]?.message;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={helperText}
          {...field}
        />
      )}
    />
  );
}
