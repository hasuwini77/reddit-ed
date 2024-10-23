import { SearchIcon } from "./SearchIcon";

export const SearchBar = () => (
  <div className="relative w-full max-w-xl">
    <input
      type="search"
      placeholder="Search Reddit..."
      className="w-full h-12 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-200 focus:border-yellow-300 focus:ring focus:ring-yellow-100 focus:ring-opacity-10 focus:outline-none transition duration-300 ease-in-out pl-10 pr-4"
    />
    <SearchIcon
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
);
