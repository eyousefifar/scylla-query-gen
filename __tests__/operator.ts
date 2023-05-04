import {
  equal,
  IN,
  exists,
  greaterThan,
  isNull,
  lessThan,
  notEqual,
  notExists,
  notNull,
} from "../src/query/operator";

describe("operators", () => {
  it("should return equality string", () => {
    const dynamicEqualStr = equal({
      argument: "id",
      useParameter: true,
    });
    const staticEqualStr = equal({ argument: "id", value: 1 });
    expect(dynamicEqualStr).toBe("id = :id");
    expect(staticEqualStr).toBe("id = 1");
  });
  it("should return IN string", () => {
    const dynamicInStr = IN({ argument: "id", useParameter: true });
    const staticInStr = IN({ argument: "id", values: [1, 2, 3] });
    expect(dynamicInStr).toBe("id IN :id");
    expect(staticInStr).toBe("id IN (1, 2, 3)");
  });
  it("should return exists string", () => {
    const existsStr = exists();
    expect(existsStr).toBe("IF EXISTS");
  });
  it("should return greaterThan string", () => {
    const greaterThanStr = greaterThan({
      argument: "age",
      inclusive: true,
      useParameter: true,
    });
    const greaterThanStaticStr = greaterThan({
      argument: "age",
      inclusive: false,
      comparisonValue: 20,
    });
    expect(greaterThanStr).toBe("age >= :age");
    expect(greaterThanStaticStr).toBe("age > 20");
  });
  it("should return is null string", () => {
    const isNullStr = isNull("id");
    expect(isNullStr).toBe("id = NULL");
  });
  it("should return lessThan string", () => {
    const lessThanStr = lessThan({
      argument: "age",
      inclusive: true,
      useParameter: true,
    });
    const lessThanStaticStr = lessThan({
      argument: "age",
      inclusive: false,
      comparisonValue: 20,
    });
    expect(lessThanStr).toBe("age <= :age");
    expect(lessThanStaticStr).toBe("age < 20");
  });
  it("should return not equal string", () => {
    const notEqualStr = notEqual({
      argument: "id",
      useParameter: true,
    });
    const notEqualStaticStr = notEqual({
      argument: "id",
      notEqualValue: 1,
    });
    expect(notEqualStr).toBe("id != :id");
    expect(notEqualStaticStr).toBe("id != 1");
  });
  it("should return not exists string", () => {
    const notExistsStr = notExists();
    expect(notExistsStr).toBe("IF NOT EXISTS");
  });
  it("should return not null", () => {
    const notNullStr = notNull("id");
    expect(notNullStr).toBe("id IS NOT NULL");
  });
});
