export const validateLogin = (email, password) => {
    const errors = {};
  
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
  
    if (!password) {
      errors.password = "Password is required";
    }
  
    return errors;
  };