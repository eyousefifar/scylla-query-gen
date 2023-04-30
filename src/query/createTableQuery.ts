import { stringifyColumns } from "./stringifyColumns";
import { stringifyPrimaryKey } from "./stringifyPrimaryKey";
import { stringifyOrderBy } from "./stringifyOrderBy";
import type { ICreateTable, IQuery } from "../types";

/**
 ** builds a create table query for scylla db, it checks if table exists
 * @param args an object containing table name, version, columns, and primary key
 * @returns an object containing table name, and query string
 */
export function createTableQuery(args: ICreateTable): IQuery {
  const { name, version, columns, primaryKey, orderBy } = args;

  const tableName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const columnDefinitions = stringifyColumns(columns);
  const primaryKeyDefinition = stringifyPrimaryKey(primaryKey);
  const clusteringOrderDefinition = orderBy
    ? `WITH CLUSTERING ORDER BY (${stringifyOrderBy(orderBy)})`
    : "";

  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columnDefinitions},
    PRIMARY KEY (${primaryKeyDefinition})
  ) ${clusteringOrderDefinition};`;
  return {
    name: tableName,
    query: tableQuery,
  };
}
