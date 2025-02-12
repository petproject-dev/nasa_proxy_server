export type NearEarthObjects = Record<string, NearEarthObject[]>;

interface NearEarthObject {
	id: string;
	name: string;
	estimated_diameter: EstimatedDiameter;
	is_potentially_hazardous_asteroid: boolean;
	close_approach_data: CloseApproachData[];
	is_sentry_object: boolean;
}

interface EstimatedDiameter {
	meters: {
		estimated_diameter_min: number;
		estimated_diameter_max: number;
	};
}

interface CloseApproachData {
	close_approach_date_full: string;
	relative_velocity: {
		kilometers_per_second: string;
	};
}
