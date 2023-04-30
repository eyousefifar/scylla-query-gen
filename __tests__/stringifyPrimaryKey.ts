import { stringifyPrimaryKey } from "../src/query/stringifyPrimaryKey";

describe("stringifyPrimaryKey", () => {
  it("should stringify a single partition key", () => {
    expect(stringifyPrimaryKey({ partition: ["id"] })).toEqual("(id)");
  });
  it("should stringify multiple partition keys", () => {
    expect(stringifyPrimaryKey({ partition: ["id", "name"] })).toEqual(
      "((id, name))"
    );
  });
  it("should stringify a single partition key and a single clustering key", () => {
    expect(
      stringifyPrimaryKey({ partition: ["id"], cluster: ["name"] })
    ).toEqual("(id, name)");
  });
  it("should stringify a single partition key and multiple clustering keys", () => {
    expect(
      stringifyPrimaryKey({ partition: ["id"], cluster: ["name", "age"] })
    ).toEqual("(id, name, age)");
  });
  it("should throw error when there is a comma in partition and clustering keys", () => {
    expect(() =>
      stringifyPrimaryKey({ partition: ["id", "n,ame"], cluster: ["age"] })
    ).toThrowError("Commas are not allowed in your keys.");
    expect(() =>
      stringifyPrimaryKey({ partition: ["id"], cluster: ["name", "a,ge"] })
    ).toThrowError("Commas are not allowed in your keys.");
    
  });
});
