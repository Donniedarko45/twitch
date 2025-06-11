import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <div className="bg-dark rounded-full p-1">
        <Image src="/spooky.svg" alt="mee" height="80" width="75" />
      </div>
      <div className="flex flex-col items-center">
        <p
          className={cn(
            "text-xl font-semibold text-muted-foreground",
            font.className,
          )}
        >
          Twitch
        </p>
        <p className={cn("text-sm text-muted-foreground", font.className)}>
          Let's Play
        </p>
      </div>
    </div>
  );
};
