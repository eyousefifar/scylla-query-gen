import { separator, andStr } from "./constant";
import type { ISelectQuery } from "../types";

/**
 ** builds select query for scylla db
 * @param args an object containing select arguments
 * @returns a query string
 */

export function selectQuery(args: ISelectQuery) {
  const {
    table,
    version,
    columns,
    distinct,
    where,
    orderBy,
    limit,
    allowFiltering,
  } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;

  const columnList = columns.join(separator).toLowerCase();

  const isDistinct = distinct ? "DISTINCT" : "";
  return `SELECT ${isDistinct} ${columnList} FROM ${tableName} WHERE 
          ${where.join(andStr)} ${limit ? `LIMIT ${limit}` : ""} 
          ${orderBy ? `ORDER BY ${orderBy.key} ${orderBy.type}` : ""}  
          ${allowFiltering ? "ALLOW FILTERING" : ""};`;
}