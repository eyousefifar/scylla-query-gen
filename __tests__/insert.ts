import { insertQuery } from "../src/query/insert";

describe("insert query", () => {
  it("should return insert query", () => {
    const query = insertQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "id", useParameter: true },
        { column: "name", useParameter: true },
        { column: "age", value: 20 },
      ],
      lwt: ["name = 'erfan'"],
    });
    const expectedQuery = `INSERT INTO user_v1 (id, name, age) VALUES (:id, :name, 20) IF name = 'erfan';`;
    expect(query.replace("\n", "")).toBe(expectedQuery);
  });
  it("should return insert query with ttl", () => {
    const query = insertQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "id", useParameter: true },
        { column: "name", useParameter: true },
        { column: "age", value: 20 },
      ],
      lwt: ["name = 'erfan'"],
      ttl: {
        hours: 1,
      },
    });
    const expectedQuery = `INSERT INTO user_v1 (id, name, age) VALUES (:id, :name, 20) IF name = 'erfan' USING TTL 3600;`;
    expect(query.replace("\n", "")).toBe(expectedQuery);
  });
});
