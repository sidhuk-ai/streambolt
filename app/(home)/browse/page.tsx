import BrowsePage from "@/components/browse/BrowsePage"
import Loading from "./loading"
import { Suspense } from "react"

export default function Browse() {
  return (
    <Suspense fallback={<Loading />} >
      <BrowsePage />
    </Suspense>
  )
}

