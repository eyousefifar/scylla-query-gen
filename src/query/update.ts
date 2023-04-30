import { separator, andStr } from "./constant";
import type { IUpdateQuery } from "../types";

/**
 * produce query to update row in scylla db
 * @param args
 * @returns a query string
 */
export function updateQuery(args: IUpdateQuery) {
  const { table, version, values, where, lwt } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const updateInfo = [];
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  for (let index = 0; index < values.length; index++) {
    const { column, updateValue, useParameter } = values[index];

    if (useParameter) {
      updateInfo.push(`${column.toLowerCase()} = :${column.toLowerCase()}`);
    } else if (typeof updateValue === "string") {
      updateInfo.push(`${column.toLowerCase()} = '${updateValue}'`);
    } else if (updateValue === null) {
      updateInfo.push(`${column.toLowerCase()} = null`);
    } else {
      updateInfo.push(`${column.toLowerCase()} = ${updateValue}`);
    }
  }
  return `UPDATE ${tableName} SET ${updateInfo.join(
    separator
  )} WHERE ${where.join(andStr)} ${ifClause};`;
}
