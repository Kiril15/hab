export interface TemplateVariable {
  key: string;
  value: string;
}

export interface RenderFileProps {
  filePath: string;
  variables: TemplateVariable[];
}
