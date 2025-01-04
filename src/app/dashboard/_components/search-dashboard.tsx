import Auth from "@/components/Auth";
import { SearchIcon } from "lucide-react";
import Categories from "./Categories";

const categories = [
  {
    name: "All",
    value: "All",
  },
  {
    name: "Youtube",
    value: "Youtube",
  },
  {
    name: "Instagram",
    value: "Instagram",
  },
  {
    name: "Linkedin",
    value: "Linkedin",
  },
  {
    name: "Tweet",
    value: "Tweet",
  },
];

export default function SearchDashboard({
  onSearchInput,
}: {
  onSearchInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mx-5 py-2">
      <div className="flex flex-col md:flex-row gap-3 mt-5 py-6 px-4 bg-white rounded">
        <div className="flex gap-2 w-full md:w-[20%] items-center p-2 border rounded-full bg-white">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search....."
            className="bg-transparent outline-none text-black"
            onChange={(e) => onSearchInput(e.target.value)}
          />
        </div>
        <Categories items={categories} />
        <div className="ml-auto">
          <Auth />
        </div>
      </div>
    </div>
  );
}
