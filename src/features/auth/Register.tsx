import * as React from "react";
import RegisterForm from "./RegisterForm";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
