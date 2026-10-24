export const LATIN_TEXT = /^[a-zA-Z\s.,!?-]+$/;
export const HEX_COLOR = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const NPM_NAME = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
export const SEMVER = /^[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
export const PAGE_SLUG = /^[a-zA-Z0-9-]+$/;
export const SITE_URL = /^https?:\/\/([a-z0-9-]+\.)+[a-z]{2,}$/i;
export const LOCALE_TAG = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|\d{3}))?$/;
