interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  /** HTML content. */
  file: string;
  variables: ITemplateVariables;
}
