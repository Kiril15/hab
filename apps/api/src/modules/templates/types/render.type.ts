export interface TemplateVariable {
	key: string;
	value: string;
}

export interface RenderFileProps {
	root: string;
	filePath: string;
	variables: TemplateVariable[];
}

export interface RenderDirProps {
	root: string;
	variables: TemplateVariable[];
}

export interface RenderProps {
	content: string;
	variables: TemplateVariable[];
}
