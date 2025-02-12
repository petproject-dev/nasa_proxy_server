import { findAllMeteors } from "../repositories/meteor.repository";
import Exception from "../utils/exception";
import { NearEarthObjects } from "../types/nearEarthObjects";
import { Meteor } from "../types/meteor";

export const getMeteorsData = async ({
	startDate,
	endDate,
	count,
	wereDangerousMeteors,
}: {
	startDate: string;
	endDate: string;
	count: boolean;
	wereDangerousMeteors: boolean;
}) => {
	const response = await findAllMeteors(startDate, endDate);

	const nearEarthObjects: NearEarthObjects = response?.near_earth_objects;

	if (!nearEarthObjects) {
		throw new Exception(400, "No data available for these parameters");
	}

	const data: Meteor[] = Object.values(nearEarthObjects)
		.map((dateValues) => {
			return dateValues.map((meteor) => ({
				id: meteor.id,
				name: meteor.name,
				diameter_meters:
					meteor.estimated_diameter?.meters?.estimated_diameter_max,
				is_potentially_hazardous_asteroid:
					meteor.is_potentially_hazardous_asteroid,
				close_approach_date_full:
					meteor.close_approach_data[0].close_approach_date_full,
				relative_velocity_kps:
					meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
			}));
		})
		.flat();

	let responseData: {
		data: Meteor[];
		count?: number;
		wereDangerousMeteors?: boolean;
	} = { data };

	if (count) {
		responseData = { ...responseData, count: data.length };
	}

	if (wereDangerousMeteors) {
		responseData = {
			...responseData,
			wereDangerousMeteors: data.some(
				(meteor) => meteor.is_potentially_hazardous_asteroid,
			),
		};
	}

	return responseData;
};
