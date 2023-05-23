import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="m-auto bg-white max-w-screen-2xl">
        <Navbar />
        <main>
          <Header />
          <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
            <RestaurantCard />
          </div>
        </main>
      </main>
    </main>
  );
}
