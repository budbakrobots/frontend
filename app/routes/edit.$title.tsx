import { useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { EditEditor } from "~/components/EditEditor";
import { global_supabase } from "~/store";

const EditBlog = () => {
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

  if (data) {
    return <EditEditor blog={data} />;
  }
  return <h1>Loading</h1>;
};

export default EditBlog;

export async function loader({ params }: any) {
  const title = params!.title;
  return title;
}
