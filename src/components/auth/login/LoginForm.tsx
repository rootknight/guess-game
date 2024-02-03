"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions/authenticate";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <h1 className="text-2xl">请登录</h1>
      <Input
        type="email"
        name="email"
        label="用户名"
        placeholder="请输入用户名"
        isRequired
        value={emailValue}
        onValueChange={setEmailValue}
      />
      <Input
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        isRequired
        value={passwordValue}
        onValueChange={setPasswordValue}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onPress={() => {
            setEmailValue("");
            setPasswordValue("");
          }}
        >
          清除
        </Button>
        <Button type="submit" color="primary">
          登录
        </Button>
      </div>
      <Button variant="light" as={Link} href="/">
        返回游戏
      </Button>
    </form>
  );
};

export default LoginForm;
