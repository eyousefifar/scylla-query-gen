import { ErrorFactory } from "aba-utils";
import type { IBuildDbFunc, IQueryExec, tResultSet } from "../types";

/**
 ** builds execute function for executing query in database
 * @param args an object than contains a client instance of cassandra driver
 * @returns  async function execute
 */
export function buildExecute(args: IBuildDbFunc) {
  const { client, mode } = args;
  if (!mode) {
    throw new ErrorFactory({
      name: "mode_undefined",
      message: "mode must be defined when building execute",
      detail: 'mode?: "delete" | "init" | "insert" | "update"',
      nativeError: undefined,
      path: "build Execute, scylla client",
    });
  }
  /**
   ** delete function uses db client to delete database rows
   * @param info an object containing query string, params object and error path in code
   * @returns scylla db result set
   */
  return async function execute(info: IQueryExec): Promise<tResultSet> {
    const { query, params, errorPath } = info;
    try {
      const result = await client.execute(query, params, { prepare: true });
      return result;
    } catch (error) {
      throw new ErrorFactory({
        name: `query_${mode}_failed`,
        message: "problem in executing query",
        detail: `query: ${query} failed to execute`,
        path: errorPath,
        nativeError: error,
      });
    }
  };
}
