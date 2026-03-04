"use client";
import { cn } from "@/lib/utils";

import { Button } from "@/shared/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/components/ui/field";

import { Input } from "@/shared/components/ui/input";

import Link from "next/link";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { EyeIcon, EyeOff, RefreshCwIcon } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";

export function SignupForm({
  className,

  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded, setActive, signUp } = useSignUp();
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setIsloading(true);

    const nameParts = fullname.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    if (!firstName || !lastName) {
      toast.error("Please enter your full name (First and Last)");
      setIsloading(false);
      return;
    }

    try {
      if (password === confirmPassword) {
        await signUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName,
        });
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      } else {
        toast.error("Password mismatch", {
          description: "Enter same password in both fields",
        });
        return;
      }

      setPendingVerification(true);
    } catch (err: any) {
      toast.error("Signup Failed", { description: err.errors[0].longMessage });
    } finally {
      setIsloading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsloading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
        toast.success("Account Created!");
      }
    } catch (err: any) {
      toast.error("Signup Failed", { description: err.errors[0].longMessage });
    } finally {
      setIsloading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("New code sent!", {
        description: "Check your inbox (and maybe your spam folder).",
      });
    } catch (err: any) {
      toast.error("Error", {
        description: err.errors[0]?.longMessage || "Failed to resend code.",
      });
    }
  };


  const signUpWith = (strategy : "oauth_google" | "oauth_apple") => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl : "/sso-callback",
      redirectUrlComplete : "/"
    })
  }
  
  

  if (pendingVerification) {
    return (
      <form onSubmit={handleVerify}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Verify Email</CardTitle>
            <CardDescription>
              Enter the code sent to <b>{email}</b>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex justify-end items-center">
              <Button
                variant="outline"
                size="xs"
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  resendCode();
                }}
              >
                <RefreshCwIcon />
                Resend Code
              </Button>
            </div>
            <Field>
              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(val) => setCode(val)}
                  required
                >
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </Field>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  {" "}
                  Verifying <Spinner data-icon="inline-start" />{" "}
                </span>
              ) : (
                "Complete Sign Up"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>

          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>

                <Input
                  id="name"
                  value={fullname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFullName(e.currentTarget.value)
                  }
                  type="text"
                  placeholder="John Doe"
                  required
                  className="placeholder:text-sm"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="placeholder:text-sm"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                />
              </Field>

              <Field>
                <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.currentTarget.value)
                        }
                        required
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      ) : (
                        <EyeIcon
                          className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      )}
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setConfirmPassword(e.currentTarget.value)
                        }
                        required
                      />
                      {showConfirmPassword ? (
                        <EyeOff
                          className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        />
                      ) : (
                        <EyeIcon
                          className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        />
                      )}
                    </div>
                  </Field>
                </Field>
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      {" "}
                      Submitting <Spinner data-icon="inline-start" />{" "}
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                <Field className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" onClick={()=>signUpWith("oauth_apple")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="sr-only">Sign up with Apple</span>
                  </Button>

                  <Button variant="outline" type="button" onClick={()=>signUpWith("oauth_google")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Already have an account? <Link href="login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
