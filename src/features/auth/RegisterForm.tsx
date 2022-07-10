import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import InputField from "../../components/form-controls/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInputs {
  username: string;
  password: string;
}

export default function RegisterForm() {
  const schema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });
  const form = useForm<IFormInputs>({
    defaultValues: {
      username: "username",
      password: "password",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputField name="username" label="Username" form={form} />
      <InputField name="password" label="Password" form={form} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
