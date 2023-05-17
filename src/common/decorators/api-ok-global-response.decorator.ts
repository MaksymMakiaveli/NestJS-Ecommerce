import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { GlobalResponse } from '../../shared';

type Params = {
  type?: 'array' | 'object';

  status?: HttpStatus;

  description?: string;
};
export const ApiOkGlobalResponse = <T extends Type<unknown>>(
  data: T,
  params?: Params,
) => {
  const { status = HttpStatus.OK, description, type = 'object' } = params || {};

  return applyDecorators(
    ApiExtraModels(GlobalResponse, data),
    ApiOkResponse({
      status,
      description: description || `The result of ${data.name}`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              result:
                type === 'array'
                  ? {
                      type: 'array',
                      items: {
                        $ref: getSchemaPath(data),
                      },
                    }
                  : { $ref: getSchemaPath(data) },
            },
          },
        ],
      },
    }),
  );
};
