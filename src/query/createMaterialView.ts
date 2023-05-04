import { stringifyPrimaryKey } from "./stringifyPrimaryKey";
import { stringifyOrderBy } from "./stringifyOrderBy";
import type { IMaterialView, IQuery } from "../types";

/**
 ** builds a materialized view query for scylla db, it checks if view exists
 * @param args an object containing view name, version, select query, and primary key
 * @returns an object containing view name, and query string
 */
export function createMaterialView(args: IMaterialView): IQuery {
  const { name, version, selectQuery, primaryKey, orderBy } = args;

  const primaryKeys = stringifyPrimaryKey(primaryKey);

  // replace ; with space ' ' at select query to prevent error
  const viewName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const viewQuey = `CREATE MATERIALIZED VIEW IF NOT EXISTS ${viewName} AS ${selectQuery.replace(
    ";",
    " "
  )} PRIMARY KEY ${primaryKeys}${
    orderBy ? ` WITH CLUSTERING ORDER BY (${stringifyOrderBy(orderBy)})` : ""
  };`;

  return {
    name: viewName,
    query: viewQuey,
  };
}
