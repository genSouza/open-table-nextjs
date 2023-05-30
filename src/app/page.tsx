import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        <RestaurantCard />
      </div>
    </main>
  );
}
