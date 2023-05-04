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

  const columnList = ` ${columns.join(separator).toLowerCase()}`;
  const whereClause = where ? ` WHERE ${where.join(andStr)}` : "";
  const limitClause = limit ? ` LIMIT ${limit}` : "";
  const isDistinct = distinct ? " DISTINCT" : "";
  const orderByClause = orderBy
    ? ` ORDER BY ${orderBy.key} ${orderBy.type}`
    : "";
  const allowFilteringClause = allowFiltering ? " ALLOW FILTERING" : "";
  return `SELECT${isDistinct}${columnList} FROM ${tableName}${whereClause}${limitClause}${orderByClause}${allowFilteringClause};`;
}
