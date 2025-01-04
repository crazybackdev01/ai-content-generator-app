"use client";
import { Suspense, useState } from "react";
import SearchDashboard from "./_components/search-dashboard";
import TemplateList from "./_components/TemplateList";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  // console.log("Search input " + searchInput);
  // console.log("Dashboard component is rendered with search input");

  return (
    <div>
      <SearchDashboard onSearchInput={setSearchInput} />
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <TemplateList searchInput={searchInput} />
      </Suspense>
    </div>
  );
}
