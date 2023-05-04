import { Client, types } from "cassandra-driver";

export type tResultSet = types.ResultSet;
export type tRow = types.Row;
export type tLong = types.Long;

export interface IScyllaClient  {
  id: string | undefined;
  applicationName: string | undefined;
  applicationVersion: string | undefined;
  contactPoints: string[];
  localDataCenter: string;
  keyspace: string;
}
export interface IBuildDbFunc {
  client: Client;
  mode?: "delete" | "init" | "insert" | "update";
}

export interface IQueryOptions {
  autoPage: boolean | undefined;
  fetchSize: number | undefined;
  pageState: string | Buffer | undefined;
  consistency: number | undefined;
  serialConsistency: number | undefined;
}
export interface IConcurrentQuery {
  query: string;
  params: Record<string, any>[];
}
export interface IConcurrent  {
  queries: IConcurrentQuery[];
}
export interface IConcurrentResult {
  resultItems: any[];
  totalExecuted: number;
  allExecuted: boolean;
}
export interface ISelect  {
  query: string;
  params: Record<string, any> | undefined;
  unique: boolean;
  queryOptions: IQueryOptions | undefined;
}

export interface IQueryExec  {
  query: string;
  params: Record<string, any> | undefined;
}

export interface IInit  {
  query: string;
}

export type tScyllaNativeTypes =
  | "ASCII"
  | "BIGINT"
  | "BLOB"
  | "BOOLEAN"
  | "COUNTER"
  | "DATE"
  | "DECIMAL"
  | "DOUBLE"
  | "DURATION"
  | "FLOAT"
  | "INET"
  | "INT"
  | "SMALLINT"
  | "TEXT"
  | "TIME"
  | "TIMESTAMP"
  | "TIMEUUID"
  | "TINYINT"
  | "UUID"
  | "VARCHAR"
  | "VARINT"
  | "SET"
  | "MAP"
  | "UDT";

export interface IDbColumn {
  name: string;
  type: tScyllaNativeTypes;
  setType?: tScyllaNativeTypes;
  udtName?: string;
  map?: {
    keyType: tScyllaNativeTypes;
    valueType: tScyllaNativeTypes;
    valueUdtName?: string;
  };
}

export interface ICreateIndex {
  name: string;
  version: string;
  table: string;
  indexKey: string;
  localIndex?: {
    partitionKey: string;
  };
}
export interface ICreateType {
  name: string;
  version: string;
  columns: IDbColumn[];
}

export interface IPrimaryKey {
  partition: string[];
  cluster?: string[];
}

export interface IOrderBy {
  key: string;
  type: "ASC" | "DESC";
}
export interface ICreateTable {
  name: string;
  version: string;
  columns: IDbColumn[];
  primaryKey: IPrimaryKey;
  orderBy?: IOrderBy[];
}

export interface IMaterialView {
  name: string;
  version: string;
  selectQuery: string;
  primaryKey: IPrimaryKey;
  orderBy?: IOrderBy[];
}
export interface IQuery {
  name: string;
  query: string;
}

export interface IValues {
  column: string;
  value?: string | number | boolean | null;
  useParameter?: boolean;
}

export interface ITTL {
  hours?: number;
  minutes?: number;
  seconds?: number;
}
export interface IInsertQuery {
  table: string;
  version: string;
  values: IValues[];
  lwt?: string[];
  ttl?: ITTL;
}
export interface IUpdateQuery {
  table: string;
  version: string;
  values: IValues[];
  where: string[];
  lwt?: string[];
  ttl?: ITTL;
}
export interface IDeleteQuery {
  table: string;
  version: string;
  columns: string[] | undefined;
  where: string[];
  lwt?: string[];
}
export interface ISelectQuery {
  table: string;
  version: string;
  distinct?: boolean;
  columns: string[];
  where: string[];
  orderBy?: {
    key: string;
    type: "ASC" | "DESC";
  };
  limit?: number;
  allowFiltering?: boolean;
}
export interface IEqual {
  argument: string;
  useParameter?: boolean;
  value?: string | number | boolean;
}

export interface IGreaterThan {
  argument: string;
  inclusive: boolean;
  useParameter?: boolean;
  comparisonValue?: string | number | boolean;
}

export interface ILessThan {
  argument: string;
  inclusive: boolean;
  useParameter?: boolean;
  comparisonValue?: string | number | boolean;
}

export interface INotEqual {
  argument: string;
  useParameter?: boolean;
  notEqualValue?: string | number | boolean;
}

export interface IIN<T> {
  argument: string;
  useParameter?: boolean;
  values?: T[];
}

// export interface IContains {
//   argument: string;

// }

// functions

interface IBatchQueries {
  query: string;
  params: Record<string, unknown>;
}
export interface IBatch {
  queries: IBatchQueries[];
}

export type tDbSelectFunc = (info: ISelect) => Promise<tResultSet>;
export type tDbUpsertFunc = (info: IQueryExec) => Promise<tResultSet>;
export type tDbInitFunc = (info: IInit) => Promise<tResultSet>;
export type tDbBatchFunc = (info: IBatch) => Promise<tResultSet>;
