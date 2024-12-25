import { createClient } from "pexels";
import { useEffect, useState } from "react";
const client = createClient(
  "nL5XBCsiYwx9davVjbbI95a8uZRNHLq6mG0izoYalSo69cCHdEsfe0HN"
);

const query = "Tech";

const HeroSection = ({ image, text }: { image: string; text: string }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (!image) {
      client.photos.search({ query, per_page: 1 }).then(({ photos }: any) => {
        setImageUrl(photos[0].url);
      });
    } else {
      setImageUrl(image);
    }
  }, []);
  return (
    <div className="relative col-span-12 row-span-3 flex">
      <img src={imageUrl} className="w-full h-full object-cover" alt="" />
      <h3
        style={{ textShadow: "2px 2px 30px rgba(0, 0, 0)" }}
        className="w-max max-w-full absolute leading-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8"
      >
        {text}
      </h3>
    </div>
  );
};

export default HeroSection;
