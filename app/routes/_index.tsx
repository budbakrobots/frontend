import { json, type MetaFunction } from "@remix-run/node";
import HeroSection from "~/components/HeroSection";
import Search from "~/components/Search";
import ShowCase from "~/components/ShowCase";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="relative grid grid-cols-12  grid-rows-12 col-span-12 row-span-10 w-full ">
      <HeroSection
        image=""
        text="Empowering Tomorrow’s Robots: Solving the Challenges of High-Tech Idiots, One Innovation at a Time"
      />
      <ShowCase />
      <Search />
    </div>
  );
}
