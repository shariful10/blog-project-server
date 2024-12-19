import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const issue: ZodIssue = err.issues[0];
  const error: TErrorSources = {
    path: issue?.path[issue.path.length - 1],
    details: issue.message,
  };

  const statusCode = 400;

  return {
    statusCode,
    details: "Validation error",
    error,
  };
};

export default handleZodError;
