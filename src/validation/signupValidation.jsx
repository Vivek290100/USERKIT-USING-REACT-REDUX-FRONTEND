export const validateSignup = (name, email, password, confirmPassword) => {
    const errors = {};
  
    if (!name.trim()) {
        errors.name = "Name is required";
    } else if (name.length > 15) {
        errors.name = "Name must be 15 characters or less";
    }
  
    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
    }
  
    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        errors.password = "Password must contain at least one letter and one number";
    }
  
    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }
  
    return errors;
};