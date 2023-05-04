import { updateQuery } from "../src/query/update";

describe("update query", () => {
  it("should return update query", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", useParameter: true },
        { column: "age", value: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
    });
    const expectedQuery = `UPDATE user_v1 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    expect(query.replace("\n", "")).toBe(expectedQuery);
  });
  it("should return update query with multiple log ids", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", useParameter: true },
        { column: "age", value: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
    });
    const expectedQuery = `UPDATE user_v1 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    expect(query.replace("\n", "")).toBe(expectedQuery);
  });
  it("should return query with ttl", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", useParameter: true },
        { column: "age", value: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
      ttl: {
        hours: 1,
      },
    });
    const expectedQuery = `UPDATE user_v1 USING TTL 3600 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    expect(query.replace("\n", "")).toBe(expectedQuery);
  });
});
