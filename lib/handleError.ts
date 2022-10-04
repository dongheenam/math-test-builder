import { NextApiResponse } from "next";
import { Error as MongooseError } from "mongoose";

export function handleError(err: unknown, res: NextApiResponse): void {
  let status = 500;
  let message = "unknown problem occurred";
  console.log(err);

  if (err instanceof MongooseError.ValidationError) {
    status = 400;
    message = `db validation failed: ${err}`;
  } else if (
    err instanceof DocumentIdError ||
    err instanceof MongooseError.CastError
  ) {
    status = 400;
    message = "id does not exist in the db or has wrong type";
  } else if (err instanceof QueryError) {
    status = 400;
    message = "invalid request query, body or route";
  } else if (err instanceof Error) {
    message = `unknown error occurred`;
  }

  res.status(status).send({ status: "error", message: message });
  res.end();
}

/* custom errors */
export class QueryError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "QueryError";
  }
}
export class DocumentIdError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "DocumentIdError";
  }
}
