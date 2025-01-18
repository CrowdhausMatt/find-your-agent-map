import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const MapHeader = () => {
  const handleSearch = ({ lat, lng }: { lat: number; lng: number }) => {
    // Handle the search result coordinates
    console.log("Search coordinates:", lat, lng);
    // You can add additional logic here if needed
  };

  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-3xl items-center gap-4">
        <SearchBar onSearch={handleSearch} />
        <Link
          to="/social-index"
          className="whitespace-nowrap rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          Social Index
        </Link>
      </div>
    </div>
  );
};

export default MapHeader;