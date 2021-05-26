// NOTE: schema.graphql (this string) is just used for the MOCKED API:
// I generate it by a) running the normal back-end, opening up the graphql playground, and then going schema > DOWNLOAD
// workaround:
export const graphqlSchema = `type Query {
    carts: [Cart!]!
    ... TODO: not like this!
  `;
  