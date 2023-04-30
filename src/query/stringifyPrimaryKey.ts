import type { IPrimaryKey } from "../types";

/**
 * Turn partition key and clustering key into valid ScyllaDB CQL format.
 * @param keys An object containing partition and clustering keys.
 */
export function stringifyPrimaryKey(keys: IPrimaryKey) {
  const { partition, cluster } = keys;

  // Check if keys contain ',' character, it's not allowed because it is used as separator for keys.
  if (
    partition.join(" ").includes(",") ||
    (cluster && cluster.join(" ").includes(","))
  ) {
    throw new Error("Commas are not allowed in your keys.");
  }
  let partitionKey: string;

  if (partition.length === 0) {
    throw new Error("At least one partition key must be defined.");
  } else if (partition.length === 1) {
    partitionKey = `${partition[0]}`;
  } else {
    partitionKey = `(${partition.join(", ")})`;
  }
  if (!cluster) {
    return `(${partitionKey})`;
  }
  if (cluster.length === 1) {
    return `(${partitionKey}, ${cluster[0]})`;
  } else {
    return `(${partitionKey}, ${cluster.join(", ")})`;
  }
}
