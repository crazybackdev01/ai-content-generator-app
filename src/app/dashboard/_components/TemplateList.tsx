"use client";
import { contentTemplates } from "@/lib/ContentTemplates";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function TemplateList({ searchInput }: { searchInput: string }) {
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("category");

  const [templateList, setTemplateList] =
    useState<typeof contentTemplates>(contentTemplates);

  useEffect(() => {
    if (searchCategory === "All") {
      setTemplateList(contentTemplates);
    } else if (searchCategory) {
      setTemplateList(
        contentTemplates.filter(
          (template) => template.category === searchCategory
        )
      );
    } else {
      setTemplateList(contentTemplates);
    }
  }, [searchCategory]);

  useEffect(() => {
    if (searchInput && searchInput.length > 2) {
      setTemplateList(
        contentTemplates.filter((template) =>
          template.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setTemplateList(contentTemplates);
    }
  }, [searchInput]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mx-3 my-1 border-2 border-neutral-900">
      {templateList.map((template) => (
        <div key={template.name}>
          <Link
            href={`/dashboard/${template.slug}`}
            className="bg-white w-full h-[200px] flex flex-col justify-center text-center py-4 px4 rounded-lg"
          >
            <template.icon className="h-12 w-12 mx-auto mb-5"></template.icon>
            <h2 className="font-semibold">{template.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
