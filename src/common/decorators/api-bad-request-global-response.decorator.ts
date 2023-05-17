import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { BadRequestResponse, GlobalResponse } from '../../shared';

export const ApiBadRequestGlobalResponse = () =>
  applyDecorators(
    ApiExtraModels(GlobalResponse, BadRequestResponse),
    ApiBadRequestResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              result: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(BadRequestResponse),
                },
              },
            },
          },
        ],
      },
    }),
  );
