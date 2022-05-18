/*

<div class="employee__row">
        <p id="employee__data-id">1.</p>
        <p id="employee__data--firstName--lastName">Jan Kowalski</p>
        <p id="employee__data--salary">9000$</p>
        <p id="employee__data--gender">Male</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="delete__icon"
          data-id="1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>

*/

const searchingInputEl = document.querySelector("#searching__id");
const searchingInputIconEl = document.querySelector(".search__icon");
const deleteForm = document.querySelector(".searching__form");
const crudDeleteModal = document.querySelector(".crud__delete--modal");
const overlay = document.querySelector(".overlay");
const loader = document.querySelector("#loader");
const closeModalButton = document.querySelector(".close__icon");

import { API_URL, ERROR_MESSAGE } from "./help.js";
import { timeout } from "./help.js";
import { TIMEOUT_TIME } from "./help.js";
import { HTTPSTATUS_ACCEPTED } from "./help.js";
import { handleLoader } from "./help.js";
import { handleModal } from "./help.js";
import { NO_SUCH_USER_MESSAGE } from "./help.js";

const displayEmployee = async (e) => {
  e.preventDefault();

  const id = searchingInputEl.value;
  console.log(id);
  try {
    crudDeleteModal.querySelectorAll(".employee__row").forEach((row) => {
      crudDeleteModal.removeChild(row);
    });
    handleLoader(loader, true);
    handleModal(crudDeleteModal, false);

    const res = await Promise.race([
      await fetch(`${API_URL}/employees/${+id}`, {
        method: "GET",
      }),
      timeout(TIMEOUT_TIME),
    ]);

    const employee = await res.json();
    if (!employee) {
      const htmlNoFoundUser = `
      <p class="user__found--error-message">${NO_SUCH_USER_MESSAGE}</p>
      `;
      crudDeleteModal.insertAdjacentHTML("beforeend", htmlNoFoundUser);
    }

    const html = `
      <div class="employee__row">
      <p id="employee__data-id">${employee.id}.</p>
      <p id="employee__data--firstName--lastName">${employee.firstName} ${
      employee.lastName
    }</p>
      <p id="employee__data--salary">${employee.salary}$</p>
      <p id="employee__data--gender">${employee.male ? "Male" : "Female"}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="delete__icon"
        data-id="${+id}"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
      
      `;

    crudDeleteModal.insertAdjacentHTML("beforeend", html);

    handleLoader(loader, false);
    handleModal(crudDeleteModal, true);
  } catch (error) {
    handleLoader(loader, false);
    handleModal(crudDeleteModal, true);
    const htmlNoFoundUser = `
      <p class="user__found--error-message">${ERROR_MESSAGE}</p>
      `;
    crudDeleteModal.insertAdjacentHTML("beforeend", htmlNoFoundUser);
  }
};

deleteForm.addEventListener("submit", async (e) => displayEmployee(e));

crudDeleteModal.addEventListener("click", (e) => {
  const clicked = e.target.closest(".delete__icon");
  if (!clicked) return;

  deleteEmployee(+clicked.dataset.id);
});

const deleteEmployee = async (id) => {
  console.log("DELETEING");
  const res = await Promise.race([
    await fetch(`${API_URL}/employees/${+id}`, {
      method: "DELETE",
    }),
    timeout(TIMEOUT_TIME),
  ]);

  if (res.status === HTTPSTATUS_ACCEPTED) {
    hideEmployeeRow(+id);
  }
};

const hideEmployeeRow = (id) => {
  const row = document
    .querySelector(`.delete__icon[data-id="${id}"]`)
    .closest(".employee__row");

  row.classList.add("emplyee__row--hidden");
  setTimeout(() => {
    row.classList.add("hidden");
  }, 400);
};

const closeModal = () => {
  crudDeleteModal.classList.add("hidden");
  overlay.classList.add("hidden");
  searchingInputEl.value = "";
};

closeModalButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

overlay.addEventListener("click", closeModal);
