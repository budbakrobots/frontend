import { json, type MetaFunction } from "@remix-run/node";
import HeroSection from "~/components/HeroSection";
import Search from "~/components/Search";
import ShowCase from "~/components/ShowCase";

export const meta: MetaFunction = () => {
  return [
    { title: "Budbak Blogs" },
    {
      name: "description",
      content:
        "Bugbak Robots: Your go-to resource for conquering robotics software challenges. We dive into the latest tech, dissect common bugs, and offer practical solutions for roboticists, engineers, and developers working with ROS, simulation, and more. Join our community and level up your robot programming skills.",
    },
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
      <div className="sm:hidden col-span-12 row-span-1 grid grid-rows-1 grid-cols-12">
        <Search />
      </div>
    </div>
  );
}
