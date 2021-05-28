import { hydrateData } from './data/setup';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mutations, queries, } from '@multi-cart/mock-api';
import { graphqlSchema } from './schema.graphql';
// TODO: stuck on how to dodge error: (don't want to use custom NX webpack configuration just for this)
// error - /Users/karlgolka/PROJECTS/multi-cart/libs/mock-api/src/lib/schema.graphql 1:5
// Module parse failed: Unexpected token (1:5)
// You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
// NOTE: it works here in vscode/typescript thanks to the changes I made to tsconfig in this lib project, but then fails when you
// actually try to load the playground, you get 404 and the server error is the above error:

// hydrate data
hydrateData();

const resolvers = {
  Query: queries,
  Mutation: mutations,
};


export const schema = makeExecutableSchema({
  typeDefs: graphqlSchema,
  resolvers,
});
