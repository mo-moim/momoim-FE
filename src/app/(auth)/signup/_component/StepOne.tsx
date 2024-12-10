"use client";

import { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SignUpFormData } from "@/types/auth";
import Link from "next/link";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";

interface StepOneProps {
  form: UseFormReturn<SignUpFormData>;
}

export function StepOne({ form }: StepOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      <h1 className="mb-8 text-center text-2xl font-bold">회원가입</h1>
      <FormFieldWrapper control={form.control} name="name" label="닉네임" placeholder="사용할 닉네임을 입력해 주세요" />
      <FormFieldWrapper control={form.control} name="email" label="아이디" placeholder="이메일을 입력해 주세요" />
      <FormFieldWrapper
        control={form.control}
        name="password"
        label="비밀번호"
        renderContent={(field) => (
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력해주세요" {...field} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}
      />
      <FormFieldWrapper
        control={form.control}
        name="passwordConfirm"
        label="비밀번호 확인"
        renderContent={(field) => (
          <div className="relative">
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              {...field}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPasswordConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}
      />

      <div className="font-medium">
        이미 회원이신가요?
        <Link href="/login" className="pl-2 text-main underline">
          로그인
        </Link>
      </div>
    </>
  );
}
