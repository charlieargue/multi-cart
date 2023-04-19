import { Cache, QueryInput } from '@urql/exchange-graphcache';

// Allows passing in two generics (result and query) and it returns a properly-typed function
export const betterUpdateQuery = <Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query) => {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
