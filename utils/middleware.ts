import { NextFunction, Request } from 'express';

export const loggerMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  console.log(`${request.method} ${request.path}`);
  next();
};

