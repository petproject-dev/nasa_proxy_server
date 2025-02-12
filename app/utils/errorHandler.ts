import { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import Exception from "./exception";

const errorHandler = (
	err: Error | Exception,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (res.headersSent) {
		return next(err);
	}

	console.error(err.stack);

	Sentry.captureException(err);

	if (err instanceof Exception) {
		res.status(err.statusCode || 500).json({ error: err.message });
	}

	res.status(500).json({ error: err.message || "Internal Server Error" });
};

export default errorHandler;
