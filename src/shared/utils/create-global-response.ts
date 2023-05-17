import { Request } from 'express';
import { GlobalResponse } from '../dataObjects';

export const createGlobalResponse = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
  result?: any,
): GlobalResponse<any> => {
  return {
    statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
    result: result || {},
  };
};
