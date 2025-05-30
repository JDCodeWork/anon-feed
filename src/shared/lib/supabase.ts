import type { Database } from "@shared/interfaces/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const createSupabase = (token: string | null) =>
	createClient<Database>(supabaseUrl, supabaseAnonKey, {
		async accessToken() {
			return token;
		},
	});
