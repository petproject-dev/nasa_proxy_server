import { Photo } from "../types/photo";
import { findRoverPhotos } from "../repositories/rover.repository";

export const getRoverImageData = async (apiKey: string) => {
	const photos = await findRoverPhotos(apiKey);

	const photo = photos.reduce((mostRecent: Photo, currentPhoto: Photo) => {
		return new Date(currentPhoto.earth_date) > new Date(mostRecent.earth_date)
			? currentPhoto
			: mostRecent;
	});
	return photo?.img_src;
};
