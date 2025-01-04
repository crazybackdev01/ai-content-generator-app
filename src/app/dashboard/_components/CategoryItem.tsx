"use client";
import { Button } from "@/components/ui/button";
import { CategoryProps } from "./Categories";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryItem({
  item: { name, value },
}: {
  item: CategoryProps;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category");

  const isAlreadySelected = currentCategory === value;
  const handleClick = () => {
    console.log("Category clicked");
    const newURL = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isAlreadySelected ? null : value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    console.log(newURL);
    router.push(newURL);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        isAlreadySelected
          ? "bg-slate-700 text-white"
          : "bg-slate-300 text-black hover:bg-slate-300 hover:text-black"
      )}
    >
      {name}
    </Button>
  );
}
