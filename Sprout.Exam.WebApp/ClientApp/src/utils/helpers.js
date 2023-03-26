export const validateField = (fieldName, fieldValue) => {
  let errors = {};
  if (typeof fieldValue === 'string' && !fieldValue.trim()) {
    errors[fieldName] = `${fieldName} is required`;
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
