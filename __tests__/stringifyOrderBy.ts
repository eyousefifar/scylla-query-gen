import { stringifyOrderBy } from "../src/query/stringifyOrderBy";

describe("stringifyOrderBy", () => {
  it("should return empty string if no orderBy", () => {
    expect(stringifyOrderBy([])).toEqual("");
  });
  it("should return a single key and type", () => {
    expect(stringifyOrderBy([{ key: "id", type: "ASC" }])).toEqual("id ASC");
  });
  it("should return multiple keys and types", () => {
    expect(
      stringifyOrderBy([
        { key: "id", type: "ASC" },
        { key: "name", type: "DESC" },
      ])
    ).toEqual("id ASC, name DESC");
  });
});
