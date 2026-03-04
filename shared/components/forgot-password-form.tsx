"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/shared/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { EyeIcon, EyeOff, RefreshCwIcon } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";

export function ForgotPasswordForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordEqual = password === confirmPassword;
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const createResetAttempt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
      toast.success("Code sent!", { description: "Check your email inbox." });
    } catch (err: any) {
      toast.error("Error", { description: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      toast.success("Code resent!", {
        description: "Please check your inbox.",
      });
    } catch {
      toast.error("Couldn't resent code");
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      if (isPasswordEqual) {
        const result = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code,
          password,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push("/");
          toast.success("Password reset successful!");
        } else {
          console.log(result);
        }
      } else {
        toast.error("Passwords didn't match.");
      }
    } catch (err: any) {
      toast.error("Reset Failed", { description: err.errors[0].longMessage });
    } finally {
      setIsLoading(false);
    }
  };

  if (successfulCreation) {
    return (
      <form
        onSubmit={resetPassword}
        className="w-screen flex flex-col gap-6 justify-center items-center h-screen px-2"
      >
        <Card className="mx-auto max-w-md w-[90%]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter the verification code we sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Field className="w-full">
              <div className="flex items-center justify-between w-full">
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={resendCode}
                  type="button"
                >
                  <RefreshCwIcon />
                  Resend Code
                </Button>
              </div>
              
              <InputOTP
                maxLength={6}
                id="otp-verification"
                required
                onChange={(e) => setCode(e)}
              >
                <InputOTPGroup
                  className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl mx-auto"
                  autoFocus
                >
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />

                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </CardContent>

          <Field className="w-[90%] mx-auto">
            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <EyeOff
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer size-5 md:size-6"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <EyeIcon
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer size-5 md:size-6"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
          </Field>
          <Field className="w-[90%] mx-auto">
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {showConfirmPassword ? (
                <EyeOff
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer size-5 md:size-6"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              ) : (
                <EyeIcon
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer size-5 md:size-6"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                />
              )}
            </div>
          </Field>

          <CardFooter>
            <Field>
              <Button type="submit" className="w-full" disabled={isLoading}>
                              {isLoading ? (
                    <span className="flex items-center gap-2">
                      {" "}
                      Verifying <Spinner data-icon="inline-start" />{" "}
                    </span>
                  ) : (
                    "Verify"
                  )}
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    );
  }

  return (
    <form
      onSubmit={createResetAttempt}
      className="w-screen flex flex-col gap-6 justify-center items-center h-screen px-2"
    >
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address to receive a reset code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="placeholder:text-xs md:placeholder:text-sm"
              />
            </Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                    <span className="flex items-center gap-2">
                      {" "}
                      Sending Reset Code <Spinner data-icon="inline-start" />{" "}
                    </span>
                  ) : (
                    "Send Reset Code"
                  )}
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
}
