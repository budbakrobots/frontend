import HeroDefault from "../../../public/heroDefault.jpg";
const HeroSection = ({ image, text }: { image: string; text: string }) => {
  return (
    <div className="relative col-span-12 row-span-3 flex">
      <img
        src={image ? image : HeroDefault}
        className="w-full h-full object-cover"
        alt=""
      />
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