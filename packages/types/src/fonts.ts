export type FontStyle = "normal" | "italic";

export interface FontSelection {
	family: string;
	style: FontStyle;
	subset: string;
}

export interface Fonts {
	primary: FontSelection;
	secondary?: FontSelection;
}
