import { createTableQuery } from "../src/query/createTableQuery";

describe("createTableQuery", () => {
  it("should return a query string", () => {
    const result = createTableQuery({
      name: "test",
      version: "v1",
      columns: [
        { name: "id", type: "UUID" },
        { name: "name", type: "TEXT" },
        { name: "age", type: "INT" },
        { name: "email", type: "TEXT" },
        { name: "phone", type: "TEXT" },
        {
          name: "address",
          type: "MAP",
          map: { keyType: "TEXT", valueType: "TEXT" },
        },
        { name: "friends", type: "SET", setType: "TEXT" },
        { name: "user", type: "UDT", udtName: "user" },
      ],
      primaryKey: {
        partition: ["id"],
      },
      orderBy: [{ key: "id", type: "ASC" }],
    });
    expect(result.name).toEqual("test_v1");
    const query = result.query.replace(/\n/g, "").split(" ").join("");

    expect(query).toEqual(
      `CREATE TABLE IF NOT EXISTS test_v1
       ( id uuid, name text, age int, email text, phone text, address map<text,text>, friends set<text>, user user,
         PRIMARY KEY ((id)) 
        ) WITH CLUSTERING ORDER BY (id ASC);`
        .replace(/\n/g, "")
        .split(" ")
        .join("")
    );
  });
});
