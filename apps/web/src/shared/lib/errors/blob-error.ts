import { isAxiosError } from "axios";

export async function parseBlobError(error: unknown) {
	if (
		isAxiosError(error) &&
		error.response?.data instanceof Blob &&
		error.response.data.type === "application/json"
	) {
		error.response.data = JSON.parse(await error.response.data.text());
	}
	return Promise.reject(error);
}
