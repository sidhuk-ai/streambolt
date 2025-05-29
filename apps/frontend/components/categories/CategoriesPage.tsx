import CategoryCarousel from "@/components/categories/CategoryCarousel"
import Footer from "@/components/Footer"

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          {/* <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">Browse streams by category</p>
          </div> */}

          <CategoryCarousel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

