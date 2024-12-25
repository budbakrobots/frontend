import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useAtom } from "jotai";
import { global_session, global_supabase } from "~/store";
import { useNavigate } from "@remix-run/react";

export default function Admin() {
  const [session, setSession] = useAtom<any>(global_session);
  const supabase = useAtom(global_supabase)[0];
  const navigate = useNavigate();
  useEffect(() => {
    if (!supabase) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  if (!session && supabase) {
    return (
      <div className="relative col-span-12 row-span-10 w-full p-8 ">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    );
  } else {
    navigate("/", { replace: true });
  }
}
