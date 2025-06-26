"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import qs from "query-string";
import { Button } from "@/components/ui/button";

export const Search = () => {
  return (
    <form className="relative w-full lg:w-[400px] flex items-center">
      <Input 
        placeholder="Search" 
        className="bg-[#313338] text-white placeholder:text-white border-0  placeholder:text-sm placeholder:text-muted-foreground"
      />

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
