import React from "react";
import Header from "./components/Header";

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <main suppressHydrationWarning={true}>
      <Header name={params.slug}/>
      <div className="flex items-start justify-between w-2/3 m-auto 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantLayout;
