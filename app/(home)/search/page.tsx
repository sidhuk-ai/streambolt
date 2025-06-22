import Results from "@/components/search/results";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage(props: SearchPageProps){
    const { q } = await props.searchParams;

    if(!q){
        redirect('/browse');
    }

    return(
    <>
        <div className="flex flex-col min-h-screen container p-4">
            <h1 className="2xl:text-xl">Results for &quot;{q}&quot;</h1>
            <main className="flex-1">
                <Results query={q} />
            </main>
        </div>
    </>
)}