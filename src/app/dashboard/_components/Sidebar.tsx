"use client";
import Logo from "@/components/Logo";
import { CreditCard, History, WandSparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuList = [
  {
    name: "Magic tools",
    icon: WandSparkles,
    path: "/dashboard",
  },
  {
    name: "Output History",
    icon: History,
    path: "/dashboard/history",
  },
  {
    name: "Upgrade",
    icon: CreditCard,
    path: "/dashboard/upgrade",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="p-5 flex flex-col h-[800px] bg-white">
      <Logo />
      <div className="flex flex-col mt-10 h-max justify-between">
        {menuList.map((menuItem) => (
          <Link
            href={menuItem.path}
            key={menuItem.name}
            className={cn(
              "flex gap-2 mb-3 p-3 hover:bg-primary hover:text-white cursor-pointer items-center rounded-lg",
              pathname === menuItem.path && "bg-primary text-white"
            )}
          >
            <menuItem.icon className="h-6 w-6"></menuItem.icon>
            <h2 className="text-lg">{menuItem.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
