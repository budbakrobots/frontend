import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import HeroSection from "~/components/HeroSection";
import { global_supabase } from "~/store";

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
      <div ref={divRef} className="col-span-12 row-span-10"></div>
    </div>
  );
};

export default Blog;

export async function loader({ params }: any) {
  const title = params!.title;
  return title;
}
