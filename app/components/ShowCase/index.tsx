import { Link } from "@remix-run/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { global_search, global_session, global_supabase } from "~/store";
import * as spinners from "react-spinners";
const { FadeLoader } = spinners;
var timout: any;
const ShowCase = () => {
  const search = useAtom(global_search)[0];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useAtom(global_supabase)[0];
  async function fetchData(text: string) {
    setLoading(true);
    if (!supabase) return;
    let dataArr: any[] = [];
    if (text) {
      let { data, error }: any = await supabase
        .from("blogs")
        .select("*")
        .ilike("title", `%${text}%`);
      if (data) {
        dataArr = [...dataArr, ...data];
      }
      if (error) {
        console.log(error);
      }
    }
    if (text) {
      let { data, error }: any = await supabase
        .from("blogs")
        .select("*")
        .ilike("content", `%${text}%`);
      if (data) {
        dataArr = [...dataArr, ...data];
      }
      if (error) {
        console.log(error);
      }
    } else {
      const { data, error } = await supabase
        .from("blogs") // Table name
        .select("*"); // Selecting all columns (you can specify column names if needed)
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:");
        dataArr = data;
      }
    }
    setData(dataArr);
    setLoading(false);
  }
  const session = useAtom(global_session)[0];
  useEffect(() => {
    if (timout) {
      clearTimeout(timout);
    }
    timout = setTimeout(() => {
      fetchData(search);
    }, 500);
  }, [supabase, search]);
  return (
    <div className="col-span-12 overflow-y-auto grid grid-cols-12 gap-4 row-span-7 sm:row-span-8 pt-4">
      {loading ? (
        <div className="col-span-12 flex-shrink-0 flex items-center justify-center">
          <FadeLoader color="white" />
        </div>
      ) : data.length > 0 ? (
        data.map((dta, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative min-w-full aspect-video col-start-2 h-max col-span-10 sm:col-span-4 md:col-span-3 sm:col-start-2 bg-red-100 rounded-lg overflow-hidden"
          >
            <Link to={`/blog/${dta.title}`} className="w-full h-full">
              <img
                src={dta.heroImage}
                style={{ textShadow: "2px 2px 30px rgba(0, 0, 0)" }}
                className="w-full h-full object-cover"
              />
              <h2 className="absolute left-2 top-2 text-white uppercase">
                {dta.title}
              </h2>
            </Link>
            {session && (
              <Link
                to={`/edit/${dta.title}`}
                className="absolute bottom-2 right-2 p-2 px-4 no-underline bg-blue-950 border-2 border-red-100 rounded-lg"
              >
                edit
              </Link>
            )}
          </div>
        ))
      ) : (
        <h1>Blogs are comming soon</h1>
      )}
    </div>
  );
};

export default ShowCase;
