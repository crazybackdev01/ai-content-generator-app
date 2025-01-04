import { cn } from "@/lib/utils";
import { MuseoModerno } from "next/font/google";
import Image from "next/image";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: "700",
});

export default function Logo() {
  return (
    <>
      <Image src={"/logo.svg"} width={70} height={70} alt="Logo" />
      <h2 className={cn(museo ? museo.className : "", "text-xl")}>Magic</h2>
    </>
  );
}
