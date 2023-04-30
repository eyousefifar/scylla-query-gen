import { stringifyColumns } from "../src/query/stringifyColumns";

describe("stringifyColumns", () => {
  it("should return a correctly stringified column", () => {
    const result = stringifyColumns([
      {
        name: "id",
        type: "UUID",
      },
      {
        name: "name",
        type: "TEXT",
      },
      {
        name: "age",
        type: "INT",
      },
      {
        name: "address",
        type: "UDT",
        udtName: "address",
      },
      {
        name: "phones",
        type: "SET",
        setType: "TEXT",
      },
      {
        name: "emails",
        type: "SET",
        setType: "UDT",
        udtName: "email",
      },
      {
        name: "friends",
        type: "MAP",
        map: {
          keyType: "TEXT",
          valueType: "UDT",
          valueUdtName: "friend",
        },
      },
    ]);
    expect(result).toBe(
      "id uuid, name text, age int, address address, phones set<text>, emails set<frozen<email>>, friends map<text, frozen<friend>>"
    );
  });
  it("should throw error when type is set to SET and setType is not defined", () => {
    expect(() => {
      stringifyColumns([
        {
          name: "phones",
          type: "SET",
        },
      ]);
    }).toThrow("setType must be defined when type is set to SET");
  });
  it("should throw error when type is set to UDT and udtName is not defined", () => {
    expect(() => {
      stringifyColumns([
        {
          name: "address",
          type: "UDT",
        },
      ]);
    }).toThrow("udt name must be defined when type is set to UDT");
  });
  it("should throw error when type is map and map is not defined", () => {
    expect(() => {
      stringifyColumns([
        {
          name: "friends",
          type: "MAP",
        },
      ]);
    }).toThrow("you must define map key value type, when column type is map");
  });
  it("should throw error when set type or map key type is set or map", () => {
    expect(() => {
      stringifyColumns([
        {
          name: "phones",
          type: "SET",
          setType: "SET",
        },
      ]);
    }).toThrow("you cannot use set or map inside set");
    expect(() => {
      stringifyColumns([
        {
          name: "friends",
          type: "MAP",
          map: {
            keyType: "MAP",
            valueType: "TEXT",
          },
        },
      ]);
    }).toThrow("you cannot use set or map as key type or value type in a map");
  });
  it("should throw error when set or map value type is udt and udtName is not defined", () => {
    expect(() => {
      stringifyColumns([
        {
          name: "emails",
          type: "SET",
          setType: "UDT",
        },
      ]);
    }).toThrow("udt name must be defined when type is set to UDT");
    expect(() => {
      stringifyColumns([
        {
          name: "friends",
          type: "MAP",
          map: {
            keyType: "TEXT",
            valueType: "UDT",
          },
        },
      ]);
    }).toThrow("udt name must be defined when type is set to UDT");
  });
});
