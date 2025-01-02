const HeroSection = ({ image, text }: { image: string; text: string }) => {
  return (
    <div
      // style={{ backgroundImage: "url('hero.svg')" }}
      className="relative col-span-12 row-span-3 grid grid-cols-12 grid-rows-3 sm:px-8"
    >
      <div
        // style={{ backgroundImage: "url('hero.svg')" }}
        className="relative col-span-12 row-span-3 flex w-full sm:rounded-lg overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-white dark:bg-black opacity-10 backdrop-blur-lg"></div>
        {image ? (
          <img src={image} className="w-full h-full object-cover" alt="" loading="lazy"/>
        ) : (
          <Bg />
        )}

        <h4
          style={{ textShadow: "0px 0px 50px rgba(0, 0, 0)" }}
          className="w-max max-w-full uppercase absolute leading-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8"
        >
          {text}
        </h4>
      </div>
    </div>
  );
};

const Bg = () => (
  <svg
    className="w-full h-full object-cover"
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
  >
    {/* <rect fill="#ffffff" width="200" height="200" /> */}
    <defs>
      <linearGradient
        id="a"
        gradientUnits="userSpaceOnUse"
        x1="88"
        y1="88"
        x2="0"
        y2="0"
      >
        <stop offset="0" stop-color="#005092" className=" fill-transparent " />
        <stop offset="1" stop-color="#007cc4" />
      </linearGradient>
      <linearGradient
        id="b"
        gradientUnits="userSpaceOnUse"
        x1="75"
        y1="76"
        x2="168"
        y2="160"
      >
        <stop offset="0" stop-color="#868686" />
        <stop offset="0.09" stop-color="#ababab" />
        <stop offset="0.18" stop-color="#c4c4c4" />
        <stop offset="0.31" stop-color="#d7d7d7" />
        <stop offset="0.44" stop-color="#e5e5e5" />
        <stop offset="0.59" stop-color="#f1f1f1" />
        <stop offset="0.75" stop-color="#f9f9f9" />
        <stop offset="1" stop-color="#FFFFFF" />
      </linearGradient>
      <filter id="c" x="0" y="0" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
      </filter>
    </defs>
    <polygon fill="url(#a)" points="0 174 0 0 174 0" />
    <path
      fill="#000"
      fill-opacity=".5"
      filter="url(#c)"
      d="M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z"
    />
    <path
      fill="url(#b)"
      d="M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z"
    />
  </svg>
);

export default HeroSection;
