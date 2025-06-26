import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidded lg:flex items-center gap-x-4 hover:opacity-75 transisition">
        <div className=" rounded-full p-1">
          <Image src="./spooky.svg" alt="Twitch" height="40" width="32" />
        </div>
        <div className={cn(font.className)}>
          <p className="text-shadow-md text-xl">Twitch</p>
          <p className="text-lg text-amber-100 ">Let's Play</p>
        </div>
      </div>
    </Link>
  );
};


export const TwitchLogo = () => {
  return (
    <Link href="/">
      <div className="hidded lg:flex items-center gap-x-4 hover:opacity-75 transisition">
        <div className=" rounded-full p-1">
          <Image src="./icons8-twitch.svg" alt="Twitch" height="40" width="32" />
        </div>
        <div className={cn(font.className)}>
          <p className="text-shadow-md text-xl">Twitch</p>
          <p className="text-lg text-amber-100 ">Let's Play</p>
        </div>
      </div>
    </Link>
  );
};