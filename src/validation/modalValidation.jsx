// validateEditUser.js
export const validateEditUser = (name, email) => {
    const errors = {};
  
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.length > 15) {
      errors.name = "Name must be within 15 characters";
    }
  
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email)) {
      errors.email = "Email is invalid";
    }
  
    return errors;
  };
  