import axios from "axios";
import { env } from "../../config/env";
import { parseBlobError } from "../../lib/errors/blob-error";

export const $api = axios.create({
	baseURL: env.serverUrl,
	withCredentials: true,
});

$api.interceptors.response.use((response) => response, parseBlobError);
