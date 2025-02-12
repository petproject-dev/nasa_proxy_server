import { isMatch, format } from "date-fns";

const parseDate = (date: string) => {
	const hasMatch = isMatch(date, "yyyy-MM-dd");
	if (hasMatch) {
		return date;
	} else {
		return format(new Date(), "yyyy-MM-dd");
	}
};

export const makeDateRange = (date: string): string[] => {
	if (Array.isArray(date)) {
		return [parseDate(date[0]), parseDate(date[1])];
	}

	return [parseDate(date), parseDate(date)];
};
