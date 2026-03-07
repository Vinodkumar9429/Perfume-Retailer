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

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { EyeIcon, EyeOff, RefreshCwIcon } from "lucide-react";
import { Spinner } from "@/shared/components/ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signInWith = (strategy: "oauth_google" | "oauth_apple") => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback", // You have to create sso-callback route for this to work.
      redirectUrlComplete: "/",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setIsloading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
        toast.success("Authentication Successful", {
          description: "You have been successfully loggin into your account",
        });
      } else if (result.status === "needs_second_factor") {
        setShow2FA(true);
        toast.info("2FA Required", {
          description: "Please enter your verification code.",
        });
      }
    } catch (err: any) {
      const errorMessage = err.errors[0]?.longMessage || "Something went wrong";
      toast.error("Authentication Failed", {
        description: errorMessage,
      });
    } finally {
      setIsloading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsloading(true);

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code: code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
        toast.success("Identity Verified!");
      }
    } catch {
      toast.error("Invalid Code", {
        description:
          "The verification code sent to your account doesn't match with what you've entered.",
      });
    } finally {
      setIsloading(false);
    }
  };

  const resendCode = async () => {
    const emailFactor = signIn?.supportedSecondFactors?.find(
      (f) => f.strategy === "email_code",
    ) as any;

    if (emailFactor) {
      try {
        await signIn?.prepareSecondFactor({
          strategy: "email_code",
          emailAddressId: emailFactor.emailAddressId,
        });
        toast.success("Code resent!", { description: "Check your inbox." });
      } catch {
        toast.error("Failed to resent code!");
      }
    }
  };

  if (show2FA) {
    return (
      <form onSubmit={handleVerify2FA}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Verify your login</CardTitle>
            <CardDescription>
              Enter the 6-digit verification code sent to{" "}
              <span className="font-semibold text-foreground">
                {email
                  ? `${email.split("@")[0].slice(0, 2)}***@${email.split("@")[1]}`
                  : "your email"}
              </span>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={resendCode}
                >
                  <RefreshCwIcon />
                  Resend Code
                </Button>
              </div>
              <div className="flex justify-center items-center w-full">
                <InputOTP
                  autoFocus
                  maxLength={6}
                  id="otp-verification"
                  value={code}
                  onChange={(val) => setCode(val)}
                  required
                >
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </Field>
          </CardContent>
          <CardFooter>
            <Field>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (<span className="flex items-center gap-2"> Verifying <Spinner data-icon="inline-start" /> </span> ) : "Verify"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShow2FA(false)}
              >
                Back to Login
              </Button>
            </Field>
          </CardFooter>
        </Card>
      </form>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signInWith("oauth_apple")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => signInWith("oauth_google")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                  className="placeholder:text-sm"
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password" // Make sure this route exists in your (app) folder
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.currentTarget.value)
                    }
                  />
                  {showPassword ? 
                  (<EyeOff className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer" onClick={()=>setShowPassword(prev => !prev)} />) 
                  :
                  (<EyeIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground cursor-pointer" onClick={()=>setShowPassword(prev=>!prev)} />)
                  }
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (<span className="flex items-center gap-2"> Logging in <Spinner data-icon="inline-start" /> </span> ) : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
