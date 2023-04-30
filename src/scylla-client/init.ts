import { ErrorFactory } from "aba-utils";
import type { IBuildDbFunc, IInit, tResultSet } from "../types";

/**
 ** builds init function for initializing tables, UDTs etc
 * @param args an object than contains a client instance of cassandra driver
 * @returns  async function upsert
 */
export function buildInit(args: IBuildDbFunc) {
  const { client } = args;
  /**
   ** execute initialization statements
   * @param info object containing initialize query and error path
   * @returns scylla db result set
   */
  return async function init(info: IInit): Promise<tResultSet> {
    const { query, errorPath } = info;
    try {
      const result = await client.execute(query, undefined, { prepare: true });
      return result;
    } catch (error) {
      throw new ErrorFactory({
        name: "query_init_failed",
        message: "problem in executing query",
        detail: `query: ${query} failed to execute`,
        path: errorPath,
        nativeError: error,
      });
    }
  };
}
