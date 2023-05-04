import { selectQuery } from "../src/query/select";

describe("select query", () => {
  it("should return select query full", () => {
    const query = selectQuery({
      table: "users",
      version: "v1",
      columns: ["id", "name"],
      distinct: true,
      where: ["id = 1"],
      orderBy: {
        key: "id",
        type: "DESC",
      },
      limit: 10,
      allowFiltering: true,
    }).replace("\n", "");
    const expectedQuery = `SELECT DISTINCT id, name FROM users_v1 WHERE id = 1 LIMIT 10 ORDER BY id DESC ALLOW FILTERING;`;
    expect(query).toEqual(expectedQuery);
  });
  it("should return select query ", () => {
    const query = selectQuery({
      table: "users",
      version: "v1",
      columns: ["id", "name"],
      distinct: true,
      where: ["id = 1"],
      orderBy: {
        key: "id",
        type: "DESC",
      },
    }).replace("\n", "");
    const expectedQuery = `SELECT DISTINCT id, name FROM users_v1 WHERE id = 1 ORDER BY id DESC;`;
    expect(query).toEqual(expectedQuery);
  });
});
