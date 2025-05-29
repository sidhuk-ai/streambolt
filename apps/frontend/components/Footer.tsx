import Link from "next/link"
import { Zap } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium">© {new Date().getFullYear()} StreamBolt. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Cookies
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

