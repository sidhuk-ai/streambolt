"use client";

import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const SearchBar = ({url}:{url:string}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!value) return;

    const qs = queryString.stringifyUrl(
      {
        url: url,
        query: {q:value}
      },
      { skipEmptyString: true }
    );
    router.push(qs);
  };

  return (
    <form className="w-full flex" onSubmit={submitSearch}>
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search streams..."
        className="w-full rounded-md pr-8"
      />
      <Button variant={"ghost"} size={"icon"} type="submit" className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground">
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
