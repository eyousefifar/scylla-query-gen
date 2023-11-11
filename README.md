# Scylla Query Generator

The Scylla Query Generator is a collection of functions that generate query strings for interacting with ScyllaDB, a highly scalable NoSQL database. These functions simplify the process of creating queries by providing a convenient way to construct valid ScyllaDB query strings.

## Table of Contents

- [Installation](#installation)
- [Functions](#functions)
  - [createIndexQuery](#createindexquery)
  - [createMaterialView](#creatematerialview)
  - [createTypeQuery](#createtypequery)
  - [deleteQuery](#deletequery)
  - [insertQuery](#insertquery)
  - [selectQuery](#selectquery)
  - [updateQuery](#updatequery)

## Installation

The Scylla Query Generator package can be installed using your preferred package manager:

```shell
npm install scylla-query-generator
```

## Functions

### createIndexQuery

```typescript

const query = function createIndexQuery({name: "index_name", table: "table_name",
version: "v1", indexKey: "table_key_to_index", localIndex}): string;
```

The `createIndexQuery` function generates an index query string for creating an index on a field that's outside the primary key in ScyllaDB. It checks if the index already exists and returns the corresponding index query string.

### createMaterialView

```typescript
import type { IMaterialView, IQuery } from "../types";

/**
 * Builds a materialized view query for ScyllaDB. It checks if the view exists.
 * @param args - An object containing view name, version, select query, primary key, and optional order by clause.
 * @returns An object containing view name and query string.
 */
export function createMaterialView(args: IMaterialView): IQuery;
```

The `createMaterialView` function generates a materialized view query string for ScyllaDB. It checks if the view already exists and returns an object containing the view name and the corresponding query string.

### createTypeQuery

```typescript
import type { ICreateType, IQuery } from "../types";

/**
 * Creates a user-defined type (UDT) query for ScyllaDB. It checks if the type exists.
 * @param args - An object containing the UDT's name, version, and columns.
 * @returns An object containing the UDT name and the query string.
 */
export function createTypeQuery(args: ICreateType): IQuery;
```

The `createTypeQuery` function generates a user-defined type (UDT) query string for ScyllaDB. It checks if the type already exists and returns an object containing the UDT name and the corresponding query string.

### deleteQuery

```typescript
import type { IDeleteQuery } from "../types";

/**
 * Builds a delete query for deleting rows in ScyllaDB.
 * @param args - An object containing table name, version, columns, where clause, and optional lightweight transaction (LWT) clause.
 * @returns The delete query string.
 */
export function deleteQuery(args: IDeleteQuery): string;
```

The `deleteQuery` function generates a delete query string for deleting rows in ScyllaDB. It constructs the query based on the provided parameters, including the table name, version, columns, WHERE clause, and optional Lightweight Transaction (LWT) clause.

### insertQuery

```typescript
import type { IInsert

Query } from "../types";

/**
 * Generates an insert query string for inserting rows into ScyllaDB.
 * @param args - An object containing table name, version, values, optional lightweight transaction (LWT) clause, and optional time-to-live (TTL) value.
 * @returns The insert query string.
 */
export function insertQuery(args: IInsertQuery): string;
```

The `insertQuery` function generates an insert query string for inserting rows into ScyllaDB. It constructs the query based on the provided parameters, including the table name, version, column-value pairs, optional Lightweight Transaction (LWT) clause, and optional time-to-live (TTL) value.

### selectQuery

```typescript
import type { ISelectQuery } from "../types";

/**
 * Builds a select query for ScyllaDB.
 * @param args - An object containing select arguments, including table name, version, columns, distinct flag, WHERE clause, ORDER BY clause, LIMIT value, and ALLOW FILTERING flag.
 * @returns The select query string.
 */
export function selectQuery(args: ISelectQuery): string;
```

The `selectQuery` function generates a select query string for retrieving rows from a table in ScyllaDB. It constructs the query based on the provided parameters, including the table name, version, columns, distinct flag, WHERE clause, ORDER BY clause, LIMIT value, and ALLOW FILTERING flag.

### updateQuery

```typescript
import type { IUpdateQuery } from "../types";

/**
 * Generates an update query string for updating rows in ScyllaDB.
 * @param args - An object containing table name, version, values, WHERE clause, optional lightweight transaction (LWT) clause, and optional time-to-live (TTL) value.
 * @returns The update query string.
 */
export function updateQuery(args: IUpdateQuery): string;
```

The `updateQuery` function generates an update query string for modifying rows in a table in ScyllaDB. It constructs the query based on the provided parameters, including the table name, version, column-value pairs, WHERE clause, optional Lightweight Transaction (LWT) clause, and optional time-to-live (TTL) value.

