import React from "react";

// remove - from the title and put the last word in paranthesis
const formatName = (name: string) => {
  const words = name.split("-");
  const lastWord = words[words.length - 1];
  const formattedName = words
    .slice(0, words.length - 1)
    .join(" ")
    .concat(` (${lastWord})`);
  return formattedName;
};

const Header = ({ name }: { name: string }) => {
  return (
    <div className="overflow-hidden h-96">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-center text-white capitalize text-7xl text-shadow">
          {formatName(name)}
        </h1>
      </div>
    </div>
  );
};

export default Header;
