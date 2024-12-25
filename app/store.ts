import { Session, SupabaseClient } from "@supabase/supabase-js";
import { atom } from "jotai";

export const global_supabase = atom<SupabaseClient>();
export const global_session = atom<any>();
export const global_search = atom<string>("");
