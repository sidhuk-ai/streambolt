import LiveChat from "@/components/LiveChat";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-screen p-2">
        <div className="col-span-2 row-span-3 bg-gray-800 rounded-lg p-4">
          Video Player
        </div>
        <div className="col-span-1 row-span-3 bg-gray-700 rounded-lg p-4">
          <LiveChat />
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">Extras</div>
    </>
  );
}
