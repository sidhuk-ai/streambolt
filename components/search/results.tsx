import { searchService } from "@/lib/search-service";
import ResultsCard from "./results-card";

interface ResultsProps {
  query: string;
}

export default async function Results({ query }: ResultsProps) {
  const data = await searchService(query);
  return (
    <div className="flex flex-col gap-y-4">
      {data.length === 0 ? (
        <div className="text-sm text-muted-foreground m-4">
          No results found. Try searching for something else.
        </div>
      ) : (
        <div className="m-4 flex flex-col gap-y-4">
          {data.map((stream, i) => (
            <ResultsCard
              key={i}
              streamId={stream.id}
              avatar={stream.user.imageUrl as string}
              thumbailUrl={stream.thumbnailUrl}
              title={stream.name}
              isLive={stream.isLive}
              username={stream.user.username}
              name={stream.name}
              updatedAt={stream.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
