# Form Checker JS

A schema-based form validation package for React, Node.js, and Next.js. Easily validate your forms using a simple and intuitive API.

## Features

- Schema-based validation
- Custom validation rules
- Simple integration with React, Node.js, and Next.js applications
- Comprehensive error reporting

## Installation

You can install the package via npm:

```bash
npm install form-checker-js
```

## Usage

### Importing the Validator

- You can import the `Validator` class in your project as follows:

```bash
  import Validator from "form-checker-js";
```

### Defining a Schema

- Define a validation schema using your desired rules. Here's an example schema that validates a `username`, `email`, and `password`:

```bash
const schema = {
  username: [{ method: "required", message: "Username is required." }],
  email: [
    { method: "required", message: "Email is required." },
    { method: "email", message: "Email is not valid." },
  ],
  password: [
    { method: "required", message: "Password is required." },
    { method: "minLength", message: "Password must be at least 6 characters long.", options: { length: 6 } },
  ],
};
```

### Validating Data

- You can validate form data against the schema using the `Validator` class:

```bash
const validator = new Validator(schema);
const { isValid, errors } = validator.validate(formData);

if (!isValid) {
  console.log(errors); // Handle validation errors
} else {
  console.log("Form is valid!"); // Handle successful validation
}
```

### Example ( In React )

- Here's a basic example of how to use `form-checker-js` in a React component:

```bash
import React, { useState } from "react";
import Validator from "form-checker-js";

const FormComponent = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = {
      username: [{ method: "required", message: "Username is required." }],
      email: [
        { method: "required", message: "Email is required." },
        { method: "email", message: "Email is not valid." },
      ],
      password: [
        { method: "required", message: "Password is required." },
        { method: "minLength", message: "Password must be at least 6 characters long.", options: { length: 6 } },
      ],
    };

    const validator = new Validator(schema);
    const { isValid, errors } = validator.validate(formData);
    if (!isValid) {
      setErrors(errors);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      {errors.username && <span>{errors.username.join(", ")}</span>}

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <span>{errors.email.join(", ")}</span>}

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {errors.password && <span>{errors.password.join(", ")}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
```
