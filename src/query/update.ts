import { separator, andStr } from "./constant";
import { timeToSeconds } from "./timeToSeconds"
import type { IUpdateQuery } from "../types";

/**
 * produce query to update row in scylla db
 * @param args
 * @returns a query string
 */
export function updateQuery(args: IUpdateQuery) {
  const { table, version, values, where, lwt, ttl } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const updateInfo = [];
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  for (let index = 0; index < values.length; index++) {
    const { column, value, useParameter } = values[index];

    if (useParameter) {
      updateInfo.push(`${column.toLowerCase()} = :${column.toLowerCase()}`);
    } else if (typeof value === "string") {
      updateInfo.push(`${column.toLowerCase()} = '${value}'`);
    } else if (value === null) {
      updateInfo.push(`${column.toLowerCase()} = null`);
    } else {
      updateInfo.push(`${column.toLowerCase()} = ${value}`);
    }
  }
  const ttlClause = ttl ? `USING TTL ${timeToSeconds(ttl)}` : "";
  return `UPDATE ${tableName} SET ${updateInfo.join(
    separator
  )} WHERE ${where.join(andStr)} ${ifClause} ${ttlClause};`;
}
