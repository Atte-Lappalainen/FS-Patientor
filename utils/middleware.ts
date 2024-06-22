import { NextFunction, Request } from 'express';

export const loggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
  console.log(`${request.method} ${request.path}`);
  next();
};

