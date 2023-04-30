import type { IOrderBy } from "../types";

export function stringifyOrderBy(orderBy: IOrderBy[]): string {
  if (!orderBy) {
    return "";
  }
  if (orderBy.length === 1) {
    const { key, type } = orderBy[0];
    if (type !== "ASC" && type !== "DESC") {
      throw new Error(`Invalid order type "${type}" for key "${key}".`);
    }
    return `${key} ${type}`;
  }
  const orderKeys = [];
  for (let index = 0; index < orderBy.length; index++) {
    const { key, type } = orderBy[index];
    if (type !== "ASC" && type !== "DESC") {
      throw new Error(`Invalid order type "${type}" for key "${key}".`);
    }
    orderKeys.push(`${key} ${type}`);
  }
  return orderKeys.join(", ");
}
