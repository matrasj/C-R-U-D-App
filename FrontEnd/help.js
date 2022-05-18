export const API_URL = "http://localhost:8081";
export const TIMEOUT_TIME = 10;
export const CREATED = 201;
const ACCEPTED_CREATION_MESSAGE = "Creating new employee gone successfully";
export const ACCEPT_UPDATE_MESSAGE = "Successfully updated employee :-)";
export const ERROR_UPDATE_MESSAGE = "Something gone wrong :-(, try again";
export const ERROR_MESSAGE = "Internal server error :-(, try again later";
export const ERROR_READ_MESSAGE = "Can not load resources :-(, try again later";
export const HTTPSTATUS_ACCEPTED = 202;
export const SEARCH_BY_FIRST_NAME_LABEL = "Search by first name";
export const SEARCH_BY_LAST_NAME_LABEL = "Search by last name";
export const SEARCH_BY_SALARY_LABEL = "Search by salary";
export const NO_SUCH_USER_MESSAGE = "No one matches :-(";
export const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Too long await");
    }, s * 1000);
  });
};

export const wrongField = (inputElement) => {
  inputElement.classList.add("wrong__input--value");
};

export const wrongIcon = (parrentElement) => {
  const html = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  class="wrong__icon valid__icon"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fill-rule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
    clip-rule="evenodd"
  />
</svg>
  `;
  parrentElement.insertAdjacentHTML("beforeend", html);
};

export const acceptIcon = (parrentElement) => {
  const html = `
  <svg xmlns="http://www.w3.org/2000/svg" class="accept__icon valid__icon" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
</svg>
  `;
  parrentElement.insertAdjacentHTML("beforeend", html);
};

export const acceptField = (inputElement) => {
  inputElement.classList.add("accept__input--value");
};

export const handleLoader = (loader, show) => {
  show ? loader.classList.remove("hidden") : loader.classList.add("hidden");
};

export const handleModal = (modal, show) => {
  show ? modal.classList.remove("hidden") : modal.classList.add("hidden");
};

export const acceptAction = (messageElement) => {
  messageElement.innerHTML = ACCEPTED_CREATION_MESSAGE;
};

export const clearFields = (...fields) => {
  fields.forEach((field) => {
    field.value = "";
    if (field.closest(".flex").querySelector(".valid__icon"))
      field
        .closest(".flex")
        .removeChild(field.closest(".flex").querySelector(".valid__icon"));

    field.classList.remove("wrong__input--value");
    field.classList.remove("accept__input--value");
  });
};

export const clearRadio = (...radioButtons) => {
  radioButtons.forEach((radioButton) => (radioButton.checked = false));
};

export const clearFieldsUpdateModal = (...fields) => {
  fields.forEach((field) => (field.value = ""));
};
