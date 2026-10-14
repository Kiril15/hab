import { isAxiosError } from "axios";

export interface INestError {
	statusCode: number;
	message: string | string[];
	error: string;
}

export const catchError = (error: unknown): string => {
	const defaultError = "An unexpected error occurred";

	if (isAxiosError<INestError>(error)) {
		const message = error.response?.data?.message;

		if (Array.isArray(message)) {
			return message[0] ?? defaultError;
		}
		if (typeof message === "string") {
			return message;
		}
	}

	if (error instanceof Error) {
		return error.message;
	}

	return defaultError;
};
