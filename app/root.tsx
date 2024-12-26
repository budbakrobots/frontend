import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import supabase from "./config/supabaseClient";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { global_session, global_supabase } from "./store";
import Menu from "./components/Menu";
import Loading from "./loading";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const setSupabase = useAtom(global_supabase)[1];
  const setSession = useAtom(global_session)[1];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
    setSupabase(supabase);
  }, [supabase]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{ backgroundImage: "url('/background.svg')" }}
        className="grid grid-cols-12 grid-rows-10 h-screen overflow-hidden bg-blue-50 dark:bg-blue-950 "
      >
        <Menu />
        {loading ? <Loading /> : children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
