import axios from "axios";
import config from "../config/config";

export const findAllMeteors = async (startDate: string, endDate: string) => {
	const result = await axios.get(`${config.nasaBaseUrl}/neo/rest/v1/feed`, {
		params: {
			start_date: startDate,
			end_date: endDate,
			api_key: config.nasaApiKey,
		},
	});

	return result?.data;
};
