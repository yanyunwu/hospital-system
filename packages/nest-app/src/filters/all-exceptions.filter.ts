import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = 500;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    }

    console.log('exception', exception);

    response.status(statusCode).json({
      status: 'fail',
      flag: null,
      message: exception.message ?? exception,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode,
    });

    // super.catch(exception, host);
  }
}
