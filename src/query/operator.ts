import { separator } from "./constant";
import type { IEqual, INotEqual, IGreaterThan, ILessThan, IIN } from "../types";

export function equal(args: IEqual) {
  const { argument, useParameter, value } = args;
  if (useParameter) {
    return `${argument.toLowerCase()} = :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} = ${value}`;
  }
}

export function greaterThan(args: IGreaterThan) {
  const { argument, useParameter, inclusive, comparisonValue } = args;
  if (useParameter) {
    return `${argument.toLowerCase()} >${
      inclusive ? "=" : ""
    } :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} >${
      inclusive ? "=" : ""
    } ${comparisonValue}`;
  }
}

/**
 ** produce less than or equal and less than a value string
 ** using self will result in argument < :argument for passing parameter
 * @param args an object containing argument, less_than value or self for parameters
 * @returns a less than string for scylla db
 */
export function lessThan(args: ILessThan) {
  const { argument, inclusive, comparisonValue, useParameter } = args;
  if (useParameter) {
    return `${argument.toLowerCase()} <${
      inclusive ? "=" : ""
    } :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} <${
      inclusive ? "=" : ""
    } ${comparisonValue}`;
  }
}

export function notEqual(args: INotEqual) {
  const { argument, notEqualValue, useParameter } = args;
  if (useParameter) {
    return `${argument.toLowerCase()} != :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} != ${notEqualValue}`;
  }
}

export function IN<T>(args: IIN<T>) {
  const { argument, useParameter, values } = args;
  if (useParameter) {
    return `${argument} IN :${argument}`;
  } else {
    return `${argument.toLowerCase()} IN (${values?.join(separator)})`;
  }
}

export function isNull(argument: string) {
  return `${argument} = NULL`;
}

export function notNull(argument: string) {
  return `${argument} IS NOT NULL`;
}

export function exists() {
  return "IF EXISTS";
}

export function notExists() {
  return "IF NOT EXISTS";
}
