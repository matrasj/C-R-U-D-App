import { API_URL } from "./help.js";
import { TIMEOUT_TIME } from "./help.js";
import { timeout } from "./help.js";
import { validateFirstName } from "./validations.js";
import { validateLastName } from "./validations.js";
import { vlidateSalary } from "./validations.js";
import { wrongField } from "./help.js";
import { acceptIcon } from "./help.js";
import { wrongIcon } from "./help.js";
import { acceptField } from "./help.js";
import { CREATED } from "./help.js";
import { acceptAction } from "./help.js";
import { clearFields } from "./help.js";
import { handleLoader } from "./help.js";
import { handleModal } from "./help.js";
import { ERROR_MESSAGE } from "./help.js";
import { clearRadio } from "./help.js";

const overlay = document.querySelector(".overlay");
let closeModalButton = document.querySelector(".close__icon");
const mainSection = document.querySelector(".main__section");
const loader = document.querySelector("#loader");
const message = document.querySelector(".create__message");

const crudCreateModal = document.querySelector(".crud__create--modal");
const crudReadButton = document.querySelector(".read__operation");
const crudUpdateModal = document.querySelector(".crud__update--modal");
const crudDeleteModal = document.querySelector(".crud__delete--modal");
const crudFindModal = document.querySelector(".crud__find--modal");

const crudCreateButton = document.querySelector(".create__operation");
const crudReadModal = document.querySelector(".crud__read--modal");
const crudUpdateButton = document.querySelector(".update__operation");
const crudDeleteButton = document.querySelector(".delete__operation");
const crudFindButton = document.querySelector(".find__operation");

const firstNameContainer = document.querySelector(".first__name--container");
const lastNameContainer = document.querySelector(".last__name--container");
const salaryContainer = document.querySelector(".salary--container");

const firstNameInputEl = document.querySelector("#first_name");
const lastNameInputEl = document.querySelector("#last_name");
const salaryInputEl = document.querySelector("#salary");

const crudCreateFrom = document.querySelector("#create_employee--form");

const maleRadioInput = document.querySelector("#male");
const femaleRadioInput = document.querySelector("#female");

const crudOperationsMap = new Map();
crudOperationsMap.set(crudCreateButton, crudCreateModal);
crudOperationsMap.set(crudReadButton, crudReadModal);
crudOperationsMap.set(crudUpdateButton, crudUpdateModal);
crudOperationsMap.set(crudDeleteButton, crudDeleteModal);
crudOperationsMap.set(crudFindButton, crudFindModal);

const openModal = (modalEl) => {
  clearFields(firstNameInputEl, lastNameInputEl, salaryInputEl);
  clearRadio(maleRadioInput, femaleRadioInput);
  closeModalButton = document
    .querySelector(".close__icon")
    .addEventListener("click", closeModal);
  modalEl.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let [key, value] of crudOperationsMap.entries()) {
  key.addEventListener("click", () => openModal(value));
}

const closeModal = () => {
  clearFields(firstNameInputEl, lastNameInputEl, salaryInputEl);
  message.innerHTML = "";
  crudCreateModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

overlay.addEventListener("click", closeModal);

crudCreateFrom.addEventListener("submit", async (e) => {
  e.preventDefault();

  const male = Boolean(document.querySelector(`#male`).checked);

  const firstName = firstNameInputEl.value;
  const lastName = lastNameInputEl.value;
  const salary = +salaryInputEl.value;

  try {
    let allValidations = true;
    if (!validateFirstName(firstName)) {
      wrongField(firstNameInputEl);
      wrongIcon(firstNameContainer);
      allValidations = false;
    } else {
      acceptField(firstNameInputEl);
      acceptIcon(firstNameContainer);
    }

    if (!validateLastName(lastName)) {
      wrongField(lastNameInputEl);
      wrongIcon(lastNameContainer);
      allValidations = false;
    } else {
      acceptField(lastNameInputEl);
      acceptIcon(lastNameContainer);
    }

    if (!vlidateSalary(salary)) {
      wrongField(salaryInputEl);
      wrongIcon(salaryContainer);
      allValidations = false;
    } else {
      acceptField(salaryInputEl);
      acceptIcon(salaryContainer);
    }

    if (!allValidations) {
      throw new Error("Invalid data");
    }
    const employee = {
      firstName,
      lastName,
      salary,
      male,
    };

    handleLoader(loader, true);
    handleModal(crudCreateModal, false);

    const res = await Promise.race([
      await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }),
      timeout(TIMEOUT_TIME),
    ]);
    if (res.status === CREATED) {
      acceptAction(message);
      message.classList.add("correct__action");
    } else {
      failureAction();
    }
    const response = await res.json();

    handleLoader(loader, false);
    handleModal(crudCreateModal, true);
  } catch (error) {
    handleLoader(loader, false);
    handleModal(crudCreateModal, true);
    message.innerHTML = ERROR_MESSAGE;
    message.classList.add("error__action");
  }
});
