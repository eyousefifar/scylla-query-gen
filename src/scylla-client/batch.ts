import { ErrorFactory } from "aba-utils";
import type { IBuildDbFunc, IBatch, tResultSet } from "../types";

/**
 * builds batch function for executing batch statement
 * @param args object containing cassandra driver client instance
 * @returns async function batch
 */
export function buildBatch(args: IBuildDbFunc) {
  const { client } = args;
  return async function batch(info: IBatch): Promise<tResultSet> {
    const { queries, errorPath } = info;
    try {
      const result = await client.batch(queries, { prepare: true });
      return result;
    } catch (error) {
      throw new ErrorFactory({
        name: "batch_failed",
        message: "batch is not applied",
        detail: `batch: ${JSON.stringify(info)} failed`,
        nativeError: error,
        path: errorPath,
      });
    }
  };
}
