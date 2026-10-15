export interface NpmSearchPackage {
	name: string;
	version: string;
	description?: string;
}

export interface NpmSearchResponse {
	objects: { package: NpmSearchPackage }[];
}

export interface NpmLatestResponse {
	name: string;
	version: string;
}
