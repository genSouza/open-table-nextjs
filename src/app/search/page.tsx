import Header from "./components/Header";
import Sidebar from "./components/SearchSidebar";
import Card from "./components/RestaurantCard";

const Search = () => {
  return (
    <>
      <Header />
      <div className="flex items-start justify-between w-2/3 py-4 m-auto">
        <Sidebar />
        <div className="w-5/6">
          <Card />
        </div>
      </div>
    </>
  );
};

export default Search;
