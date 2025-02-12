import axios from "axios";
import config from "../config/config";

export const findRoverPhotos = async (apiKey: string) => {
	const result = await axios.get(
		`${config.nasaBaseUrl}/mars-photos/api/v1/rovers/curiosity/photos`,
		{
			params: {
				sol: config.nasaSol,
				api_key: apiKey,
			},
		},
	);

	return result?.data?.photos;
};
