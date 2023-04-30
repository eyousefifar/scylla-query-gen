import type { ICreateIndex } from "../types";

/**
 * Creates an index on a field that's outside primary key in scylla db.
 * It checks if index exists and returns the index query string.
 * @param args an object containing index name, table name, index and table version
 * index_key (the key you want to index), if needed add index locally instead of globally.
 * @returns index query string
 */
export function createIndexQuery(args: ICreateIndex) {
  const { name, table, version, indexKey, localIndex } = args;

  const indexName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;

  const localIndexClause = localIndex ? `(${localIndex.partitionKey}),` : "";
  const query = `CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName} (${localIndexClause}${indexKey.toLowerCase()});`;
  return query;
}
