import { MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import HeroSection from "~/components/HeroSection";
import { global_supabase } from "~/store";

export const meta: MetaFunction = () => {
  const title = useLoaderData();

  return [
    { title: `Budbak Robots :${title}` },
    {
      name: "description",
      content:
        "Bugbak Robots: Your go-to resource for conquering robotics software challenges. We dive into the latest tech, dissect common bugs, and offer practical solutions for roboticists, engineers, and developers working with ROS, simulation, and more. Join our community and level up your robot programming skills.",
    },
  ];
};

const Blog = () => {
  const [data, setData] = useState<any>();
  const title = useLoaderData();
  const supabase = useAtom(global_supabase)[0];
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function fetchData() {
      if (!supabase) return;
      const { data, error }: any = await supabase
        .from("blogs")
        .select("*")
        .eq("title", title)
        .single();

      if (divRef && divRef.current && data) {
        divRef.current.innerHTML = data.content;
      }
      setData(data);
      console.log(error);
    }
    fetchData();
  }, [title, supabase]);
  return (
    <div className="col-span-12 row-span-10 overflow-x-hidden grid grid-cols-12 grid-rows-12">
      {data && <HeroSection image={data.heroImage} text={data.title} />}
      <div className="col-span-12 row-span-10 flex sm:p-8">
        <div
          ref={divRef}
          className="w-full h-full overflow-x-hidden p-4  bg-white dark:bg-black dark:bg-opacity-50 bg-opacity-70  sm:rounded-lg"
        ></div>
      </div>
    </div>
  );
};

export default Blog;

export async function loader({ params }: any) {
  const title = params!.title;
  return title;
}
