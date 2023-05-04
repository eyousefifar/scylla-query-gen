import { andStr, separator } from "./constant";
import { timeToSeconds } from "./timeToSeconds";
import type { IInsertQuery } from "../types";

/**
 * produce query to insert rows into scylla db
 * @param args
 * @returns an insert query string
 */
export function insertQuery(args: IInsertQuery) {
  const { table, version, values, lwt, ttl } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const columns = [];
  const columnValues = [];
  for (let index = 0; index < values.length; index++) {
    const { column, value, useParameter } = values[index];
    columns.push(column.toLowerCase());
    if (useParameter) {
      columnValues.push(`:${column.toLowerCase()}`);
    } else if (typeof value === "string") {
      columnValues.push(`'${value}'`);
    } else if (value === null) {
      columnValues.push("null");
    } else {
      columnValues.push(value);
    }
  }
  const ifClause = Array.isArray(lwt) ? ` IF ${lwt.join(andStr)}` : "";
  const ttlClause = ttl ? ` USING TTL ${timeToSeconds(ttl)}` : "";
  return `INSERT INTO ${tableName} (${columns.join(
    separator
  )}) VALUES (${columnValues.join(separator)})${ifClause}${ttlClause};`;
}
