import Scylla from "cassandra-driver";
import { ErrorFactory } from "aba-utils";

import type { IBuildDbFunc, IConcurrent, IConcurrentResult } from "../types";

export function buildConcurrent(args: IBuildDbFunc) {
  const { client } = args;
  return async function concurrent(
    info: IConcurrent
  ): Promise<IConcurrentResult> {
    const { queries } = info;
    try {
      const { errors, resultItems, totalExecuted } =
        await Scylla.concurrent.executeConcurrent(client, queries, {
          collectResults: true,
          concurrencyLevel: 200,
        });
      // TODO: result items are result set according to docs, but not sure if this is correct
      if (errors.length > 0) {
        throw new ErrorFactory({
          name: "concurrent_queries_failed",
          message: "problem in executing concurrent queries",
          detail: `${errors.join(", ")}`,
          nativeError: errors,
        });
      }
      return {
        resultItems,
        totalExecuted,
        allExecuted: totalExecuted === queries.length,
      };
    } catch (error) {
      throw new ErrorFactory({
        name: "concurrent_query_failed",
        message: "problem in executing concurrent query",
        detail: `query: ${queries.join(", ")} failed to execute`,
        nativeError: error,
      });
    }
  };
}
