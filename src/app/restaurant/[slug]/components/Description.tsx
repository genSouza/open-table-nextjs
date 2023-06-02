import React from "react";

export const Description = ({ description }: { description: string }) => {
  console.log(description);
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
};
