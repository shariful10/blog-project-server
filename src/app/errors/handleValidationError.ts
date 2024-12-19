import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const val = Object.values(err.errors)[0] as
    | mongoose.Error.ValidatorError
    | mongoose.Error.CastError;
  const error: TErrorSources = {
    path: val?.path,
    details: val?.message,
  };

  const statusCode = 400;

  return {
    statusCode,
    details: "Validation error",
    error,
  };
};

export default handleValidationError;
