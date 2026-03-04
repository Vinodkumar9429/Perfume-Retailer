
import { SignupForm } from "@/shared/components/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-screen min-h-screen">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <p className="font-lejour">
          AVENTRAIL
          </p>
        </Link>
        <SignupForm />
      </div>
    </div>
  )
}
