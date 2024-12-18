import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const error: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        details: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    details: "Validation error",
    error,
  };
};

export default handleValidationError;
