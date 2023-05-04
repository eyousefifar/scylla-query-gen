import { isReservedWord } from "./isReservedWord";
import type { IDbColumn } from "../types";

/**
 * stringify an array of db columns
 * @param columns an array of i_db_column
 * @returns a string of db columns with their types, like - id uuid, name text. separated by ' , ' for a valid syntax (cql, scylla db)
 */
export function stringifyColumns(columns: IDbColumn[]): string {
  const columnString: string[] = [];
  for (let index = 0; index < columns.length; index++) {
    const { name, type, setType, udtName, map } = columns[index];
    isReservedWord(name);
    /**
     * if column type is UDT (user defined types)
     * udtName variable should be defined
     */
    if (type === "UDT") {
      if (!udtName)
        throw new Error("udt name must be defined when type is set to UDT");
      // push db column with udt as type
      columnString.push(`${name.toLowerCase()} ${udtName.toLowerCase()}`);
      /**
       * if type is a set, setType must be defined
       * set is a sorted list with a type : set<type>
       * also if setType is UDT, udtName should be de defined
       * and db column type in set must be frozen : set<frozen<UDT>>
       */
    } else if (type === "SET") {
      if (!setType)
        throw new Error("setType must be defined when type is set to SET");
      if (setType === "UDT") {
        if (!udtName)
          throw new Error("udt name must be defined when type is set to UDT");

        columnString.push(
          `${name.toLowerCase()} set<frozen<${udtName.toLowerCase()}>>`
        );
      } else if (setType === "SET" || setType === "MAP") {
        throw new Error("you cannot use set or map inside set");
      } else {
        columnString.push(
          `${name.toLowerCase()} set<${setType.toLowerCase()}>`
        );
      }
      /**
       * if type is map, keyType nad valueType must be defined
       * map is a key value structure and both key and value must be typed
       * if value type is a udt, udtName must be defined and it must be pushed
       * frozen
       */
    } else if (type === "MAP") {
      if (!map || !map.keyType || !map.valueType)
        throw new Error(
          "you must define map key value type, when column type is map"
        );
      const { keyType, valueType, valueUdtName } = map;

      if (valueType === "UDT") {
        if (!valueUdtName) {
          throw new Error("udt name must be defined when type is set to UDT");
        }

        columnString.push(
          `${name.toLowerCase()} map<${keyType.toLowerCase()}, frozen<${valueUdtName.toLowerCase()}>>`
        );
      } else if (
        valueType === "SET" ||
        valueType === "MAP" ||
        keyType === "SET" ||
        keyType === "MAP"
        // ! FIXME: probably you can't add udt as keyType, needs some test
      ) {
        throw new Error(
          "you cannot use set or map as key type or value type in a map"
        );
      } else {
        columnString.push(
          `${name.toLowerCase()} map<${keyType.toLowerCase()}, ${valueType.toLowerCase()}>`
        );
      }
    } else {
      columnString.push(`${name.toLowerCase()} ${type.toLowerCase()}`);
    }
  }
  return columnString.join(", ");
}
