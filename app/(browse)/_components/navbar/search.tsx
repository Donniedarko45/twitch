"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
//import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { term: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="bg-[#313338] text-white border-0  placeholder:text-sm placeholder:text-muted-foreground"
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
