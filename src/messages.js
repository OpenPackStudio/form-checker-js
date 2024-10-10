const defaultMessages = {
  required: "This field is required.",
  minLength: "This field must be at least {length} characters long.",
  email: "This field must be a valid email address.",
};

const getErrorMessage = (rule, options) => {
  let message = defaultMessages[rule.method];
  if (options) {
    Object.keys(options).forEach((key) => {
      message = message.replace(`{${key}}`, options[key]);
    });
  }
  return message;
};

module.exports = { getErrorMessage };
