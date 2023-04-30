import { Client } from "cassandra-driver";
import { buildInit } from "./init";
import { buildSelect } from "./select";
import { buildExecute } from "./execute";
import { buildBatch } from "./batch";
import { Uuid } from "./datatype"
import { ErrorFactory } from "aba-utils";
import type { IScyllaClient } from "../types";


export * as dataType from "./datatype";

/**
 ** create a scylla db client then builds CRUD methods
 * @param info an object containing database info needed to connect
 * @returns an object containing init, select, upsert, delete methods
 */
export function scyllaClient(info: IScyllaClient) {
  const {
    contactPoints,
    keyspace,
    localDataCenter,
    applicationName,
    applicationVersion,
    id,
    errorPath,
  } = info;
  try {
    const client = new Client({
      applicationName,
      applicationVersion,
      id: id ? Uuid.fromString(id) : undefined,
      contactPoints: contactPoints,
      localDataCenter: localDataCenter,
      keyspace,
      encoding: {},
    });
    return {
      init: buildInit({ client }),
      batch: buildBatch({ client }),
      select: buildSelect({ client }),
      insert: buildExecute({ client, mode: "insert" }),
      update: buildExecute({ client, mode: "update" }),
      delete: buildExecute({ client, mode: "delete" }),
    };
  } catch (error) {
    throw new ErrorFactory({
      name: "scylla_client_failed",
      message: "Error in creating scylla db client",
      detail: "",
      nativeError: error,
      path: errorPath,
    });
  }
}
