import { CATEGORIES, REGIONS } from "@/constants/options";
import { SignUpFormData } from "@/types/auth";
import * as z from "zod";

export const REGION_VALUES = REGIONS.map((r) => r.value) as [string, ...string[]];
export const CATEGORY_VALUES = CATEGORIES.map((c) => c.value) as [string, ...string[]];

export const signUpSchema = z
  .object({
    name: z.string().min(2, "닉네임은 2자 이상이어야 합니다").max(10, "닉네임은 10자 이하여야 합니다"),
    email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "8글자 이상, 영문, 숫자, 특수문자를 모두 포함해야 합니다.",
      ),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 한 번 입력해주세요"),
    regions: z.array(z.enum(REGION_VALUES)).min(1, "활동 지역을 선택해주세요"),
    interestCategories: z.array(z.enum(CATEGORY_VALUES)).min(1, "관심 카테고리를 선택해주세요"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export type SignUpFormType = z.infer<typeof signUpSchema>;

// 기본값 설정
export const DEFAULT_SIGNUP_VALUES: SignUpFormData = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  regions: ["ALL"],
  interestCategories: ["ALL"],
};
