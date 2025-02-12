import { Request, Response, NextFunction } from "express";
import { getMeteorsData } from "../services/meteor.service";
import { makeDateRange } from "../utils/dateUtils";

export const getMeteors = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const date = String(req.query.date);
		const [startDate, endDate] = makeDateRange(date);
		const count = req.query.count === "true";
		const wereDangerousMeteors = req.query["were-dangerous-meteors"] === "true";

		const result = await getMeteorsData({
			startDate,
			endDate,
			count,
			wereDangerousMeteors,
		});

		res.json(result);
	} catch (err) {
		next(err);
	}
};

export const renderMeteors = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const date = String(req.query.date);
		const [startDate, endDate] = makeDateRange(date);
		const count = req.query.count === "true";
		const wereDangerousMeteors = req.query["were-dangerous-meteors"] === "true";

		const meteors = await getMeteorsData({
			startDate,
			endDate,
			count,
			wereDangerousMeteors,
		});

		res.render("meteors.njk", {
			meteors: meteors.data,
			wereDangerousMeteors: meteors.wereDangerousMeteors,
			count: meteors.count,
		});
	} catch (err) {
		next(err);
	}
};
