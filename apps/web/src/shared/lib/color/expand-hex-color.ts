const SHORT_HEX = /^#[0-9a-fA-F]{3}$/;

export const expandHexColor = (hex: string) =>
	SHORT_HEX.test(hex) ? `#${[...hex.slice(1)].map((char) => char + char).join("")}` : hex;
