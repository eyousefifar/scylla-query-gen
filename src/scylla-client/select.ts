import { ErrorFactory } from "aba-utils";
import type {
  IBuildDbFunc,
  ISelect,
  IQueryOptions,
  tResultSet,
} from "../types";

/**
 ** builds select function for selecting rows, also check uniqueness if needed
 * @param args object containing cassandra driver client instance
 * @returns  async function upsert
 */
export function buildSelect(args: IBuildDbFunc) {
  const { client } = args;
  function queryOptionsGen(
    queryOptions: IQueryOptions | undefined
  ): IQueryOptions {
    if (!queryOptions) {
      return {
        autoPage: undefined,
        consistency: undefined,
        fetchSize: undefined,
        pageState: undefined,
        serialConsistency: undefined,
      };
    }
    return queryOptions;
  }
  /**
   ** select rows from db using client, if row needs to be unique, it will
   ** check uniqueness. meaning there should be only one result per query ( for each partition key )
   ** if not will result and Error Factory.
   * !remember if this happens in code. it's a design flaw and should be
   * !fixed immediately. must be caught on testing
   * @param info object containing query string, params, unique and error path
   * @returns scylla db result set
   */
  return async function select(info: ISelect): Promise<tResultSet> {
    const { query, params, unique, queryOptions, errorPath } = info;
    const { autoPage, consistency, fetchSize, pageState, serialConsistency } =
      queryOptionsGen(queryOptions);
    try {
      const result = await client.execute(query, params, {
        prepare: true,
        autoPage,
        fetchSize,
        pageState,
        consistency,
        serialConsistency,
        
      });
      // check if row is unique
      if (unique && result.rowLength > 1) {
        throw new ErrorFactory({
          name: "row_must_be_unique",
          message: "results should contain only one row",
          detail: `results: ${result.rows.toString()}, must be dealt with immediately. query: ${query}
             , params: ${params}, info: ${result.info}`,
          path: errorPath,
          nativeError: undefined,
        });
      }
      return result;
    } catch (error) {
      throw new ErrorFactory({
        name: "select_failed",
        message: "problem in executing query",
        detail: `query: ${query}, params: ${params} failed to execute`,
        path: errorPath,
        nativeError: error,
      });
    }
  };
}
