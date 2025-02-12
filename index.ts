import "./instrument";
import express, { Request, Response } from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import config from "./app/config/config";
import { getMeteors, renderMeteors } from "./app/controllers/meteor.controller";
import errorHandler from "./app/utils/errorHandler";
import {
	getRoverImage,
	renderRoverImage,
	renderRoverImageForm,
} from "./app/controllers/rover.controller";
import getRoverImageSchema from "./app/validatorSchemas/getRoverImageSchema";
import getMeteorsSchema from "./app/validatorSchemas/getMeteorsSchema";
import validator from "./app/middlewares/validator";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure("views", {
	autoescape: true,
	express: app,
});
app.set("view engine", "njk");

app.get("/api/meteors", validator(getMeteorsSchema, "query"), getMeteors);
app.get("/meteors", validator(getMeteorsSchema, "query"), renderMeteors);

app.post("/api/rovers/image", validator(getRoverImageSchema), getRoverImage);
app.get("/rovers/image-form", renderRoverImageForm);
app.post("/rovers/image", validator(getRoverImageSchema), renderRoverImage);

app.use(errorHandler);
app.use("*", (req: Request, res: Response) => {
	res.status(404).send("Page not found");
});

app.listen(config.port, () => {
	console.log(`Server started, port: ${config.port}`);
});
