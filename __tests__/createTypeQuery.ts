import { createTypeQuery } from "../src/query/createTypeQuery";

describe("create type query", () => {
  it("should return type query", () => {
    const typeQuery = createTypeQuery({
      name: "user",
      columns: [
        { name: "id", type: "UUID" },
        { name: "name", type: "TEXT" },
        { name: "age", type: "INT" },
      ],
      version: "v1",
    });
    const query = typeQuery.query.replace("\n", "");
    const expectedQuery =
      `CREATE TYPE IF NOT EXISTS user_v1 ( id uuid, name text, age int );`.replace(
        "\n",
        ""
      );
    expect(typeQuery.name).toBe("user_v1");
    expect(query).toBe(expectedQuery);
  });
});
