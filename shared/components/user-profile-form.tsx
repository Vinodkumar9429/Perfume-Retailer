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
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import { Spinner } from "@/shared/components/ui/spinner";
import { Camera, EyeIcon, EyeOff, RefreshCwIcon, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
}

export interface UserProfileFormProps extends React.ComponentProps<"div"> {
  user?: UserProfileData;

  onAvatarChange?: (file: File) => Promise<void> | void;
  onAvatarRemove?: () => Promise<void> | void;

  onNameSave?: (data: {
    firstName: string;
    lastName: string;
  }) => Promise<void> | void;

  onEmailChangeRequest?: (newEmail: string) => Promise<void> | void;
  onEmailVerify?: (code: string) => Promise<void> | void;
  onEmailResendCode?: () => Promise<void> | void;

  onPasswordChange?: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void> | void;

  onDeleteAccount?: () => Promise<void> | void;

  hasPassword: boolean;
}


export function UserProfileForm({
  className,
  user,
  onAvatarChange,
  onAvatarRemove,
  onNameSave,
  onEmailChangeRequest,
  onEmailVerify,
  onEmailResendCode,
  onPasswordChange,
  onDeleteAccount,
  hasPassword,
  ...props
}: UserProfileFormProps) {

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");

  const [newEmail, setNewEmail] = useState(user?.email ?? "");
  const [emailOtpStep, setEmailOtpStep] = useState(false);
  const [emailOtpCode, setEmailOtpCode] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.imageUrl ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const initials =
    (firstName?.[0] ?? "") + (lastName?.[0] ?? "") || (user?.email?.[0] ?? "U");

  const passwordsMatch =
    newPassword === confirmNewPassword && newPassword.length > 0;

  const emailChanged = newEmail !== (user?.email ?? "");

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);
    if (onAvatarChange) {
      setIsAvatarLoading(true);
      try {
        await onAvatarChange(file);
      } finally {
        setIsAvatarLoading(false);
      }
    }
  };

  const handleAvatarRemove = async () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onAvatarRemove) {
      setIsAvatarLoading(true);
      try {
        await onAvatarRemove();
      } finally {
        setIsAvatarLoading(false);
      }
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onNameSave) return;
    setIsNameLoading(true);
    try {
      await onNameSave({ firstName, lastName });
    } finally {
      setIsNameLoading(false);
    }
  };

  const handleEmailRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onEmailChangeRequest) return;
    setIsEmailLoading(true);
    try {
      await onEmailChangeRequest(newEmail);
      setEmailOtpStep(true);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onEmailVerify) return;
    setIsEmailLoading(true);
    try {
      await onEmailVerify(emailOtpCode);
      setEmailOtpStep(false);
      setEmailOtpCode("");
      setNewEmail(newEmail);
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!onEmailResendCode) return;
    try {
      await onEmailResendCode();
    } catch {
      console.log("Error")
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onPasswordChange) return;
    setIsPasswordLoading(true);
    try {
      await onPasswordChange({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-2xl", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile picture</CardTitle>
          <CardDescription>
            Update your photo. This will be displayed on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <div className="relative group">
              <Avatar className="size-24 text-lg">
                {avatarPreview ? (
                  <AvatarImage
                    src={avatarPreview}
                    alt={`${firstName} ${lastName}`}
                  />
                ) : null}
                <AvatarFallback className="text-xl font-medium bg-muted text-muted-foreground">
                  {isAvatarLoading ? (
                    <Spinner className="size-5" />
                  ) : (
                    initials.toUpperCase()
                  )}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer -z-10"
                aria-label="Change profile picture"
              >
                <Camera className="size-5 text-background" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 sm:items-start">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAvatarLoading}
                >
                  <Camera className="size-4" />
                  Upload
                </Button>
                {avatarPreview && (
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleAvatarRemove}
                    disabled={isAvatarLoading}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                )}
              </div>
              <FieldDescription className="text-xs">
                JPG, PNG or WEBP. Max 5MB.
              </FieldDescription>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarSelect}
              aria-label="Upload profile picture"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal information</CardTitle>
          <CardDescription>Update your name.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="name-form" onSubmit={handleNameSubmit}>
            <FieldGroup>
              <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="profile-first-name">
                    First name
                  </FieldLabel>
                  <Input
                    id="profile-first-name"
                    type="text"
                    placeholder="John"
                    required
                    value={firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.currentTarget.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="profile-last-name">Last name</FieldLabel>
                  <Input
                    id="profile-last-name"
                    type="text"
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.currentTarget.value)
                    }
                  />
                </Field>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button type="submit" form="name-form" disabled={isNameLoading}>
            {isNameLoading ? (
              <span className="flex items-center gap-2">
                Saving <Spinner data-icon="inline-start" />
              </span>
            ) : (
              "Save changes"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Email address</CardTitle>
          <CardDescription>
            {emailOtpStep
              ? "Enter the verification code we sent to your new email address."
              : "Update the email address associated with your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!emailOtpStep ? (

            <form id="email-form" onSubmit={handleEmailRequest}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="profile-email">Email address</FieldLabel>
                  <Input
                    id="profile-email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={newEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEmail(e.currentTarget.value)
                    }
                  />
                  <FieldDescription>
                    A verification code will be sent to the new email.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          ) : (

            <form id="email-verify-form" onSubmit={handleEmailVerify}>
              <FieldGroup>
                <Field>
                  <div className="flex items-center justify-between w-full">
                    <FieldLabel htmlFor="email-otp">
                      Verification code
                    </FieldLabel>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={handleResendCode}
                      type="button"
                    >
                      <RefreshCwIcon className="size-3" />
                      Resend Code
                    </Button>
                  </div>
                  <InputOTP
                    maxLength={6}
                    id="email-otp"
                    required
                    value={emailOtpCode}
                    onChange={(val) => setEmailOtpCode(val)}
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
                  <FieldDescription className="text-center">
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-foreground">
                      {newEmail}
                    </span>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex items-center border-t pt-6">
          {emailOtpStep ? (
            <div className="flex w-full items-center justify-between">
              <Button
                variant="ghost"
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  setEmailOtpStep(false);
                  setEmailOtpCode("");
                  setIsEmailLoading(false);
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                form="email-verify-form"
                disabled={isEmailLoading || emailOtpCode.length < 6}
              >
                {isEmailLoading ? (
                  <span className="flex items-center gap-2">
                    Verifying <Spinner data-icon="inline-start" />
                  </span>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          ) : (
            <div className="flex w-full justify-end">
              <Button
                type="submit"
                form="email-form"
                disabled={isEmailLoading || !emailChanged}
              >
                {isEmailLoading ? (
                  <span className="flex items-center gap-2">
                    Sending code <Spinner data-icon="inline-start" />
                  </span>
                ) : (
                  "Update email"
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{hasPassword ? "Update Password" : "Set Password"}</CardTitle>
          <CardDescription>
            {hasPassword ? "Change the password associated with your account." : "Set a password for your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="password-form" onSubmit={handlePasswordSubmit}>
            <FieldGroup>
              {hasPassword && (
                <Field>
                  <FieldLabel htmlFor="current-password">
                    Current password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCurrentPassword(e.currentTarget.value)
                      }
                    />
                    {showCurrentPassword ? (
                      <EyeOff
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                      />
                    )}
                  </div>
                </Field>
              )}
              <Separator />


              <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="new-password">New password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewPassword(e.currentTarget.value)
                      }
                    />
                    {showNewPassword ? (
                      <EyeOff
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                      />
                    )}
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-new-password">
                    Confirm new password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirm-new-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmNewPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmNewPassword(e.currentTarget.value)
                      }
                    />
                    {showConfirmPassword ? (
                      <EyeOff
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    ) : (
                      <EyeIcon
                        className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-muted-foreground cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      />
                    )}
                  </div>
                </Field>
              </Field>

              {confirmNewPassword.length > 0 && !passwordsMatch && (
                <p className="text-destructive text-sm -mt-4">
                  Passwords do not match.
                </p>
              )}
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            form="password-form"
            disabled={
              isPasswordLoading ||
              (!currentPassword && hasPassword) ||
              !newPassword ||
              !passwordsMatch
            }
          >
            {isPasswordLoading ? (
              <span className="flex items-center gap-2">
                Updating <Spinner data-icon="inline-start" />
              </span>
            ) : (
              "Update password"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-xl text-destructive">
            Danger zone
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all of its data. This action
            cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end border-t border-destructive/30 pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button">
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
