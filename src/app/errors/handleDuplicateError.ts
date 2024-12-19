import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: mongoose.Error): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const error: TErrorSources = {
    path: "",
    details: `${extractedMessage} already exists!`,
  };

  const statusCode = 400;

  return {
    statusCode,
    details: "Invalid ID",
    error,
  };
};

export default handleDuplicateError;
