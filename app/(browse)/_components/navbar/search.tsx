"use client";
import { ArrowLeftFromLine, SearchIcon, X } from "lucide-react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "usehooks-ts";

interface SearchProps {
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

export const Search = ({ isSearching, setIsSearching }: SearchProps) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true },
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  if (isMobile && !isSearching) {
    return (
      <div className="flex items-center justify-center">
        <Button
          onClick={() => setIsSearching(true)}
          variant="ghost"
          size="icon"
          className="p-2"
        >
          <SearchIcon className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`relative w-full flex items-center ${isSearching ? "w-full" : "lg:w-[400px]"}`}
    >
      {isMobile && (
        <Button
          type="button"
          onClick={() => setIsSearching(false)}
          variant="ghost"
          size="icon"
          className="p-2 mr-2"
        >
          <ArrowLeftFromLine className="h-6 w-6 text-white" />
        </Button>
      )}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="bg-[#313338] text-white border-0 placeholder:text-sm placeholder:text-muted-foreground"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition-shadow"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full px-4 rounded-l-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
      >
        <SearchIcon className="h-5 w-5 text-white" />
      </Button>
    </form>
  );
};
