import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-[#948979]">Dashboard</h1>
      <UserButton />
    </div>
  );
}
