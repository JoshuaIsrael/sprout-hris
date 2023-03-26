export const camelToNormal = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1').toLowerCase();
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const validateField = (fieldName, fieldValue) => {
  let errors = {};
  if (typeof fieldValue === 'string' && !fieldValue.trim()) {
    errors[fieldName] = `${camelToNormal(fieldName)} is required`;
  }
  return errors;
}

export const validateForm = (currentValues) => {
  let errors = {};

  Object.keys(currentValues).forEach((fieldName) => {
    const fieldValue = currentValues[fieldName];
    const fieldErrors = validateField(fieldName, fieldValue);
    if (Object.keys(fieldErrors).length > 0) {
      errors[fieldName] = fieldErrors[fieldName];
    }
  });

  return Object.keys(errors).length === 0 && errors.constructor === Object ? true : errors;
};
