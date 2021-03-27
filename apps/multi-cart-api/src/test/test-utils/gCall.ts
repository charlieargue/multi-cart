import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import { createSchema } from "./createSchema";
import { jest } from '@jest/globals'

interface Options {
  source: string;
  variableValues?: Maybe<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookies: jest.fn()
      }
    }
  });
};