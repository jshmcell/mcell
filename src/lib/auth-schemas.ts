import { z } from "zod";

/** Original hint: "8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요." */
export const PASSWORD_HINT =
  "8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요.";

const passwordComplexity = z
  .string()
  .min(8, "비밀번호는 8자리 이상이어야 합니다.")
  .max(128, "비밀번호는 128자리 이하이어야 합니다.")
  .regex(/[a-z]/, "영문 소문자를 포함해야 합니다.")
  .regex(/[A-Z]/, "영문 대문자를 포함해야 합니다.")
  .regex(/[0-9]/, "숫자를 포함해야 합니다.")
  .regex(/[^A-Za-z0-9]/, "특수문자를 포함해야 합니다.");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "이메일을 입력하세요.")
  .email("올바른 이메일 형식이 아닙니다.")
  .max(254);

export const nameSchema = z
  .string()
  .trim()
  .min(1, "이름을 입력하세요.")
  .max(50, "이름은 50자 이하로 입력하세요.");

/** Agreement step consents (step 1). All are 필수 on the original. */
export const consentSchema = z.object({
  policyAgree: z.literal(true, { message: "이용약관 동의가 필요합니다." }),
  privacyAgree: z.literal(true, {
    message: "개인정보 수집 및 이용 동의가 필요합니다.",
  }),
  age14Agree: z.literal(true, { message: "만 14세 이상 확인이 필요합니다." }),
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordComplexity,
    passwordConfirm: z.string(),
    name: nameSchema,
    consent: consentSchema,
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력하세요."),
  rememberMe: z.boolean(),
});

export const checkEmailSchema = z.object({ email: emailSchema });

export const forgetPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordComplexity,
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
