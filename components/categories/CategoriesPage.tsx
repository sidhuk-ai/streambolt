import CategoryCarousel from "@/components/categories/CategoryCarousel"
import Footer from "@/components/Footer"

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <CategoryCarousel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

