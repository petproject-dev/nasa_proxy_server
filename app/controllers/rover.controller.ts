import { Request, Response, NextFunction } from "express";
import { getRoverImageData } from "../services/rover.service";

export const getRoverImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { api_key } = req.body;
		const result = await getRoverImageData(api_key);

		res.json(result);
	} catch (err) {
		next(err);
	}
};

export const renderRoverImageForm = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		res.render("roverImageForm.njk");
	} catch (err) {
		next(err);
	}
};

export const renderRoverImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { api_key } = req.body;
		const image = await getRoverImageData(api_key);

		res.render("roverImage.njk", {
			image,
		});
	} catch (err) {
		next(err);
	}
};
