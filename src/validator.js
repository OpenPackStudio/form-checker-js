class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const errors = {};
    for (const key in this.schema) {
      const rules = this.schema[key];
      const value = data[key];

      for (const rule of rules) {
        const { method, message, options } = rule;

        if (!this[method](value, options, data)) {
          errors[key] = errors[key] || [];
          errors[key].push(message);
        }
      }
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }

  required(value) {
    return value !== undefined && value !== null && value !== "";
  }

  minLength(value, { length }) {
    return typeof value === "string" && value.length >= length;
  }

  maxLength(value, { length }) {
    return typeof value === "string" && value.length <= length;
  }

  email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  url(value) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(value);
  }

  numeric(value) {
    return !isNaN(value);
  }

  integer(value) {
    return Number.isInteger(Number(value));
  }

  min(value, { min }) {
    return Number(value) >= min;
  }

  max(value, { max }) {
    return Number(value) <= max;
  }

  // Custom validation method for checking if two fields match
  matches(value, { field, message }, data) {
    return value === data[field] || (data[field] === undefined && value === "");
  }

  // Add a conditional validation method
  conditional(value, { condition, rules }, data) {
    if (condition(data)) {
      const validator = new Validator({ field: rules });
      const result = validator.validate({ field: value });
      return result.isValid;
    }
    return true;
  }

  // Add more validation methods as needed
}

module.exports = Validator;
