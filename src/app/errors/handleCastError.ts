import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: TErrorSources = [
    {
      path: err?.path,
      details: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    details: "Invalid ID",
    error,
  };
};

export default handleCastError;
