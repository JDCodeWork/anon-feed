import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const timeAgo = (dateString: string) => {
	const date = new Date(dateString);
	return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
};
