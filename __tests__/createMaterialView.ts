import { createMaterialView } from "../src/query/createMaterialView";

describe("material view query", () => {
  it("should return material view query", () => {
    const materialViewQuery = createMaterialView({
      name: "customer_view",
      version: "v1",
      selectQuery: "SELECT * FROM customers_v1",
      primaryKey: {
        partition: ["customer_id"],
        cluster: ["created_at"],
      },
      orderBy: [{ key: "created_at", type: "DESC" }],
    });
    expect(materialViewQuery.name).toBe("customer_view_v1");
    const query = materialViewQuery.query.replace("\n", "");
    const expectedQuery =
      `CREATE MATERIALIZED VIEW IF NOT EXISTS customer_view_v1 AS SELECT * FROM customers_v1 PRIMARY KEY (customer_id, created_at) WITH CLUSTERING ORDER BY (created_at DESC);`.replace(
        "\n",
        ""
      );
    expect(query).toBe(expectedQuery);
  });
});
