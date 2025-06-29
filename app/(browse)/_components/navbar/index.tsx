"use client";

import { TwitchLogo } from "@/app/(auth)/_components/logo";
import { Search } from "./search";
import { Actions } from "./Actions";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";

export const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#151517] px-2 lg:px-4 flex justify-between items-center shadow-sm md:px-3">
      {!isSearching && <TwitchLogo />}
      <Search isSearching={isSearching} setIsSearching={setIsSearching} />
      {!isSearching && <Actions />}
    </nav>
  );
};
