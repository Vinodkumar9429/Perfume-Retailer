import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function SSOCallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background w-screen h-screen">
      <div className="flex flex-col items-center gap-4 p-8 text-center animate-in fade-in duration-500">
        {/* Visual Spinner */}
        <div className="relative flex items-center justify-center">
           <Loader2 className="h-10 w-10 animate-spin text-primary" />
           <div className="absolute h-10 w-10 border-4 border-primary/10 rounded-full" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Verifying...</h2>
          <p className="text-sm text-muted-foreground">
            Securely syncing your account details.
          </p>
        </div>

        {/* The ghost logic working in the background */}
        <AuthenticateWithRedirectCallback 
          // Optional: handle errors specifically if social login fails mid-way          
        />
      </div>
    </div>
  )
}