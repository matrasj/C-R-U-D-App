class Validation {
  firstNameValidation(firstNameValue) {
    return /^[a-zA-Z ]{2,30}$/.test(firstNameValue);
  }

  lastNameValidation(lastNameValue) {
    return /^[a-zA-Z ]{2,30}$/.test(lastNameValue);
  }

  salaryValidation(salaryValue) {
    return /^(?:\d*\.\d{1,2}|\d+)$/.test(String(salaryValue));
  }
}

const validation = new Validation();

export const validateFirstName = (firstNameValue) => {
  return validation.firstNameValidation(firstNameValue);
};

export const validateLastName = (lastNameValue) => {
  return validation.lastNameValidation(lastNameValue);
};

export const vlidateSalary = (salaryValue) => {
  return validation.salaryValidation(salaryValue);
};
