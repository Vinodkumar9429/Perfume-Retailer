"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Spinner } from "@/shared/components/ui/spinner";
import { UserProfileForm } from "@/shared/components/user-profile-form";
import { useClerk, useUser } from "@clerk/nextjs";

import { useState } from "react";
import { toast } from "sonner";

export function UserProfilePage() {
  const { isLoaded, user } = useUser();
  const {signOut} = useClerk();
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [isredirecting, setIsRedirecting] = useState(false);

  if (!isLoaded) return null;

  if (!user) {
    return <div>Not Signed In!</div>;
  }

  const handleSecurityError = (err: any) => {
    if (err.errors?.[0]?.code === "reauthentication_required") {
      setShowReauthModal(true);
    } else {
      toast.error("Operation failed", {
        description: err.errors?.[0]?.message || "Please try again.",
      });
    }
  };

  const userData = {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.primaryEmailAddress?.emailAddress ?? "",
    imageUrl: user.imageUrl,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Account settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your profile, email, and password.
          </p>
        </div>

        <UserProfileForm
          user={userData}
          onAvatarChange={async (file) => {
            try {
              await user.setProfileImage({ file });
              toast.success("Avatar Updated!");
            } catch (err: any) {
              toast.error("Failed to update avatar", {
                description: err.errors?.[0]?.message || "Please try again.",
              });
            }
          }}
          onAvatarRemove={async () => {
            try {
              await user.setProfileImage({ file: null });
              toast.success("Avatar removed!");
            } catch {
              toast.error("Failed to remove avatar");
            }
          }}
          onNameSave={async (data) => {
            try {
              await user.update({
                firstName: data.firstName,
                lastName: data.lastName,
              });
              toast.success("Name updated!", {
                description: `${data.firstName} ${data.lastName}`,
              });
            } catch (err: any) {
              toast.error("Name update failed!", {
                description: err.errors?.[0]?.message || "Please try again.",
              });
            }
          }}
          onEmailChangeRequest={async (newEmail) => {
            try {
              const emailAddress = await user.createEmailAddress({
                email: newEmail,
              });
              await emailAddress.prepareVerification({
                strategy: "email_code",
              });
              toast.success("Code sent!", {
                description: `Verification code sent to ${newEmail}.`,
              });
            } catch (error: any) {
              toast.error("Failed to request email change", {
                description:
                  error.errors?.[0]?.message ||
                  "Check the email format and try again.",
              });
              throw error;
            }
          }}
          onEmailVerify={async (code) => {
            try {
              const pendingEmail = user.emailAddresses.find(
                (email) => email.verification.status !== "verified",
              );

              if (!pendingEmail) {
                throw new Error("No pending email verification found.");
              }

              await pendingEmail.attemptVerification({ code });
              await user.update({ primaryEmailAddressId: pendingEmail.id });

              const otherEmails = user.emailAddresses.filter(
                (email) => email.id !== pendingEmail.id,
              );

              for (const email of otherEmails) {
                await email.destroy();
              }

              toast.success("Email verified!", {
                description: "Your email address has been updated.",
              });
            } catch (error: any) {
              toast.error("Verification failed", {
                description:
                  error.errors?.[0]?.message ||
                  "The code might be incorrect or expired.",
              });
              throw error;
            }
          }}
          onEmailResendCode={async () => {
            try {
              const pendingEmail = user.emailAddresses.find(
                (email) => email.verification.status !== "verified",
              );
              await pendingEmail?.prepareVerification({
                strategy: "email_code",
              });
              toast.success("Code resent!", {
                description: "Please check your inbox.",
              });
            } catch {
              toast.error("Failed to resend code");
            }
          }}
          onPasswordChange={async (data) => {
            try {
              if (user.passwordEnabled) {
                await user.updatePassword({
                  currentPassword: data.currentPassword,
                  newPassword: data.newPassword,
                });
                toast.success("Password changed!");
              } else {
                await user.updatePassword({
                  newPassword: data.newPassword,
                } as any);
                toast.success("Password Set Success!", {
                  description: "You can now log in with email or Google.",
                });
              }
            } catch (error: any) {
              handleSecurityError(error);
              throw error;
            }
          }}
          onDeleteAccount={async () => {
            try {
              await user.delete();
              window.location.href = "/";
              toast.error("Account deletion");
            } catch (error: any) {
              toast.error("Deletion failed", {
                description:
                  error.errors?.[0]?.message ||
                  "Please log in again to delete your account.",
              });
            }
          }}
          hasPassword={user.passwordEnabled}
        />
        <AlertDialog open={showReauthModal} onOpenChange={setShowReauthModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Security Verification Required
              </AlertDialogTitle>
              <AlertDialogDescription>
                For your protection, sensitive changes require a fresh login.
                Please sign in again to continue with this update.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  setIsRedirecting(true);
                  await signOut();
                  window.location.href = `/sign-in?redirect_url=${window.location.pathname}`;
                }}
              >
                {isredirecting ? (
                  <span className="flex items-center gap-2"> Redirecting <Spinner data-icon="inline-start" /> </span>
                ) : "Re-authenticate"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
