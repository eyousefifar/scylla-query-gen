import { separator, andStr } from "./constant";
import type { IDeleteQuery } from "../types";

/**
 ** builds delete query for deleting rows
 * @param args an object containing table name, version, columns, and where clause
 * lwt clause, an array of string usually filled with operators for LWT in scylla db
 * @returns delete query string
 */
export function deleteQuery(args: IDeleteQuery) {
  const { table, version, columns, where, lwt } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const deleteColumns = columns ? ` ${columns.join(separator)}` : "";
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  return `DELETE ${deleteColumns.toLowerCase()} FROM ${tableName} WHERE ${where.join(
    andStr
  )} ${ifClause};`;
}
