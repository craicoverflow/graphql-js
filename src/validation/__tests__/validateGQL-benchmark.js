// @flow strict

import { parse } from '../../language/parser';
import { buildSchema } from '../../utilities/buildASTSchema';
import { getIntrospectionQuery } from '../../utilities/getIntrospectionQuery';

import { validate } from '../validate';

import { bigSchemaSDL } from '../../__fixtures__';

const schema = buildSchema(bigSchemaSDL, { assumeValid: true });
const queryAST = parse(getIntrospectionQuery());

export const name = 'Validate Introspection Query';
export const count = 50;

/**
 * @internal
 */
export function measure() {
  validate(schema, queryAST);
}
