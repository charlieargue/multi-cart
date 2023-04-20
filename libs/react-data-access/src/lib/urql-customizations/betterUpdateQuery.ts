import { Cache, QueryInput } from '@urql/exchange-graphcache';

<<<<<<< HEAD
=======
// Allows passing in two generics (result and query) and it returns a properly-typed function
>>>>>>> main
export const betterUpdateQuery = <Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query) => {
    return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
