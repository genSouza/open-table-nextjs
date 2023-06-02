import React from "react";
import Image from "next/image";

const Images = ({ images }: { images: string[] }) => {
  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">{images.length} photo{images.length > 1 ? "s": ""}</h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <Image
            key={image}
            className="w-56 mb-1 mr-1 h-44"
            src={image}
            alt=""
            width={100}
            height={100}
          />
        ))}

        {/* <Image
          className="w-56 mb-1 mr-1 h-44"
          src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
          alt=""
          width={100}
          height={100}
        />
        <Image
          className="w-56 mb-1 mr-1 h-44"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701450.jpg"
          alt=""
          width={100}
          height={100}
        />
        <Image
          className="w-56 mb-1 mr-1 h-44"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701452.jpg"
          alt=""
          width={100}
          height={100}
        />
        <Image
          className="w-56 mb-1 mr-1 h-44"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701453.jpg"
          alt=""
          width={100}
          height={100}
        />
        <Image
          className="w-56 mb-1 mr-1 h-44"
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701454.jpg"
          alt=""
          width={100}
          height={100}
        /> */}
      </div>
    </div>
  );
};

export default Images;
