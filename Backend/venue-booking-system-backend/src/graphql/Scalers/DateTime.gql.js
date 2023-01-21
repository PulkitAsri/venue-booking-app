const { formatISO, parseISO, isValid } = require("date-fns");
const { GraphQLScalarType, Kind } = require("graphql");

const DateTimeScalarType = new GraphQLScalarType({
  name: "DateTime",
  description:
    "A date-time string at UTC, such as 2007-12-03T10:15:30Z, " +
    "compliant with the `date-time` format outlined in section 5.6 of " +
    "the RFC 3339 profile of the ISO 8601 standard for representation " +
    "of dates and times using the Gregorian calendar.",
  serialize(value) {
    if (value instanceof Date) {
      return formatISO(value);
    } else {
      throw new TypeError(
        "DateTime cannot be serialized from a non Date type: " +
          JSON.stringify(value)
      );
    }
  },
  parseValue(value) {
    if (typeof value === "string") {
      const parsedDate = parseISO(value);
      if (isValid(parsedDate)) return parsedDate;
      throw new TypeError(
        "DateTime cannot be parsed from a non ISO datetime string: " +
          JSON.stringify(value)
      );
    } else {
      throw new TypeError(
        "DateTime cannot be parsed from non String value: " +
          JSON.stringify(value)
      );
    }
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        "DateTime cannot be parsed from non String value: " +
          JSON.stringify(ast.value)
      );
    }
    const { value } = ast;
    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) return parsedDate;
    throw new TypeError(
      `DateTime cannot be parsed from a non ISO datetime string: ${String(
        value
      )}.`
    );
  },
});

module.exports = { DateTimeScalarType };
