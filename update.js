const crudUpdateModal = document.querySelector(".crud__update--modal");
const crudUpdateButton = document.querySelector(".update__operation");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close__icon");
const loader = document.querySelector("#loader");
const updateEmployeeForm = document.querySelector(".employee_data--container");
const updateMessage = document.querySelector(".update__message"); // ODPOWIEDX NA UPDATE TERAZZZZZZZz

const employeeIdInput = document.querySelector("#emp__id");
const employeeFirstNameInput = document.querySelector("#emp__first--name");
const employeeLastNameInput = document.querySelector("#emp__last--name");
const employeeSalaryInput = document.querySelector("#emp__salary");

import { TIMEOUT_TIME } from "./help.js";
import { timeout } from "./help.js";
import { API_URL } from "./help.js";
import { clearFieldsUpdateModal } from "./help.js";
import { clearRadio } from "./help.js";
import { handleLoader } from "./help.js";
import { handleModal } from "./help.js";
import { ACCEPT_UPDATE_MESSAGE } from "./help.js";
import { ERROR_UPDATE_MESSAGE } from "./help.js";

const maleRadioInput = document.querySelector("#male__updating");
const femaleRadioInput = document.querySelector("#female__updating");

const openModal = () => {
  crudUpdateModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  crudUpdateModal.classList.add("hidden");
  overlay.classList.add("hidden");
  clearFieldsUpdateModal(
    employeeIdInput,
    employeeFirstNameInput,
    employeeLastNameInput,
    employeeSalaryInput
  );

  updateMessage.innerHTML = "";
  clearRadio(maleRadioInput, femaleRadioInput);
};

crudUpdateButton.addEventListener("click", openModal);

overlay.addEventListener("click", closeModal);

closeModalButton.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

updateEmployeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let id = +employeeIdInput.value.trim();
  let firstName = employeeFirstNameInput.value.trim();
  let lastName = employeeLastNameInput.value.trim();
  let salary = +employeeSalaryInput.value.trim();
  let male;
  if (maleRadioInput.checked) {
    male = true;
  } else if (femaleRadioInput.checked) {
    male = false;
  } else {
    male = null;
  }
  firstName ? firstName : (firstName = null);
  lastName ? lastName : (lastName = null);
  salary ? salary : (salary = null);

  const employee = {
    id,
    firstName,
    lastName,
    salary,
    male,
  };

  handleLoader(loader, true);
  handleModal(crudUpdateModal, false);
  try {
    const res = await Promise.race([
      await fetch(`${API_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }),
      timeout(TIMEOUT_TIME),
    ]);

    const response = await res.json();

    handleLoader(loader, false);
    handleModal(crudUpdateModal, true);
    clearFieldsUpdateModal(
      employeeIdInput,
      employeeFirstNameInput,
      employeeLastNameInput,
      employeeSalaryInput
    );

    clearRadio(maleRadioInput, femaleRadioInput);
    updateMessage.innerHTML = ACCEPT_UPDATE_MESSAGE;
    updateMessage.classList.add("update__message--accept");
  } catch (error) {
    updateMessage.innerHTML = ERROR_UPDATE_MESSAGE;
    updateMessage.classList.add("update__message--error");
    handleLoader(loader, false);
    handleModal(crudUpdateModal, true);
    clearFieldsUpdateModal(
      employeeIdInput,
      employeeFirstNameInput,
      employeeLastNameInput,
      employeeSalaryInput
    );
  }
});
