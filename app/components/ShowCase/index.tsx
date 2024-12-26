import { Link } from "@remix-run/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { global_search, global_session, global_supabase } from "~/store";
import * as spinners from "react-spinners";
const { FadeLoader } = spinners;
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

var timout: any;
const ShowCase = () => {
  const search = useAtom(global_search)[0];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  const supabase = useAtom(global_supabase)[0];
  async function fetchData(text: string) {
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
    setLoading(true);

    if (timout) {
      clearTimeout(timout);
    }
    timout = setTimeout(() => {
      fetchData(search);
    }, 500);
  }, [supabase, search, refresh]);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-4 row-span-7 sm:row-span-9 sm:p-8 ">
      <div className="col-span-12 overflow-y-auto grid grid-cols-12 gap-4 row-span-7 p-4  sm:row-span-9 bg-white dark:bg-black dark:bg-opacity-70 bg-opacity-50  sm:rounded-lg">
        {loading ? (
          <div className="col-span-12 flex-shrink-0 flex items-center justify-center">
            <FadeLoader color="grey" />
          </div>
        ) : data.length > 0 ? (
          data.map((dta, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 relative min-w-full aspect-video col-start-2 h-max col-span-10 sm:col-span-4  bg-red-100 rounded-lg overflow-hidden"
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
                <>
                  <Link
                    to={`/edit/${dta.title}`}
                    className="absolute bottom-2 right-2 p-2 px-4 no-underline bg-gray-400 border-2 border-red-100 rounded-lg text-white"
                  >
                    <MdEditSquare size="16" />
                  </Link>

                  <button
                    onClick={async () => {
                      const res = confirm(
                        `Do you want to delete blog, "${dta.title}"`
                      );
                      if (res && supabase) {
                        const { data, error } = await supabase
                          .from("blogs") // Replace with your table name
                          .delete()
                          .eq("id", dta.id);
                        if (error) {
                          alert("something went wrong!!");
                        }
                        setRefresh((st: boolean) => !st);
                      }
                    }}
                    className="absolute bottom-2 left-2 p-2 px-4 no-underline bg-red-700 border-0 text-white rounded-lg"
                  >
                    <FaTrashAlt size="16" />
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <h1 className="flex items-center justify-center row-span-12 col-span-12">
            {search
              ? `No blogs found with "${search}"`
              : "Blogs are comming soon"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default ShowCase;
