export type TErrorSources = {
  path: string | number;
  details: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  details: string;
  error: TErrorSources;
};
