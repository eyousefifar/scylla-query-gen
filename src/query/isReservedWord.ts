import { ErrorFactory } from "aba-utils";
import { reservedWords } from "./constant";

export function isReservedWord(columnName: string) {
  if (reservedWords.includes(columnName.toLowerCase())) {
    throw new ErrorFactory({
      name: "reserved_word_is_not_allowed",
      message: `${columnName} is a reserved word and cannot be used as a column name`,
      detail: "",
      nativeError: undefined,
    });
  }
}
