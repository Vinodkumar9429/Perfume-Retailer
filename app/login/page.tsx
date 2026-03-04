
import { LoginForm } from "@/shared/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-screen h-screen min-h-screen">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <p className="font-lejour">
          AVENTRAIL
          </p>
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
