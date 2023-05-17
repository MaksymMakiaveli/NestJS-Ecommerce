import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createGlobalResponse } from '../../shared';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status: HttpStatus;
    let result: any;

    const setResult = (res: string | object) => {
      if (typeof res === 'string') {
        result = res;
        return;
      }
      if ('message' in res) {
        result = res.message;
        return;
      }
    };

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = response;
        code = (exception as HttpException).stack;
        break;
      case ForbiddenException:
        status = (exception as ForbiddenException).getStatus();
        message = (exception as ForbiddenException).message;
        code = (exception as any).code;
        break;
      case UnauthorizedException:
        status = (exception as UnauthorizedException).getStatus();
        message = (exception as UnauthorizedException).message;
        code = (exception as any).code;
        break;
      case BadRequestException:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as BadRequestException).message;
        code = (exception as any).code;
        setResult((exception as BadRequestException).getResponse());
        break;
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as UnprocessableEntityException).message;
        code = (exception as any).code;
        break;
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = (exception as NotFoundException).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseError = createGlobalResponse(
      status,
      message,
      code,
      request,
      result,
    );
    response.status(status).json(responseError);
  }
}
