import { LoginForm } from "@/components/login-form"
import { Suspense } from "react"
import LoginLoading from "./loading"

export default async function LoginPage() {
  // await new Promise((resolve)=>{
  //   setTimeout(() => {
  //     resolve("Internal delay");
  //   }, 2000);
  // })
  
  return (
    <>
    <Suspense fallback={<LoginLoading />}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </Suspense>
    </>
  )
}
