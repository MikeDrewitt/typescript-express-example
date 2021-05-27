import { ApiError, Unknown } from "../constant/api.error";

/**
 * Middleware function that acts as a error handler for the routers/controllers/ other middleware.
 * As a general rule of thumb for this API, we try to only send back errors of the same structure
 *
 * Also never send back an actual JS error. No one wants to see a stack trace
 *
 * TODO - might want to add some kind of network error logging.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function globalErrorHandler(err: Error, req: any, res: any, next: any) {
  if (err instanceof Error) {
    if (err.message === "Unimplemented")
      res.status(501).send(new ApiError("Endpoint has not been implemented"));
    else res.status(400).send(new ApiError(err.message));
  }

  res.status(400).send(Unknown);
}

export default globalErrorHandler;
