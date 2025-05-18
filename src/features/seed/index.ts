/* import { supabase } from "@shared/lib/supabase"; */
import { PROJECTS } from "./data/projects.data";

async function main() {
	const { error: delProjectsErr } = await supabase
		.from("projects")
		.delete()
		.eq("userId", "seed");

	if (!delProjectsErr) {
		const { error } = await supabase.from("projects").insert(PROJECTS);
		console.log("error", error);
		return;
	}

	console.log("delProjectsErr", delProjectsErr);
}

main();
