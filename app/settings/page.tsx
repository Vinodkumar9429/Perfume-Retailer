import Header from "@/shared/components/Header"
import { UserProfilePage } from "@/shared/components/user-profile-page"

const Page = () => {
  return (
    <div className="w-screen h-screen min-h-screen">
        <Header />

        <div className="mt-20">
        <UserProfilePage />
        </div>
    </div>
  )
}

export default Page
