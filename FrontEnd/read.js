import { TIMEOUT_TIME } from "./help.js";
import { timeout } from "./help.js";
import { API_URL } from "./help.js";
import { handleLoader } from "./help.js";
import { handleModal } from "./help.js";
import { ERROR_READ_MESSAGE } from "./help.js";
import { HTTPSTATUS_ACCEPTED } from "./help.js";

const crudReadModal = document.querySelector(".crud__read--modal");
const crudReadButton = document.querySelector(".read__operation");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close__icon");
const loader = document.querySelector("#loader");
const messageError = document.querySelector("#read__message");

const renderEmployees = async () => {
  try {
    handleLoader(loader, true);
    handleModal(crudReadModal, false);

    const res = await Promise.race([
      await fetch(`${API_URL}/employees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      timeout(TIMEOUT_TIME),
    ]);

    const employees = await res.json();

    crudReadModal.querySelectorAll(".employee__row").forEach((row) => {
      crudReadModal.removeChild(row);
    });

    employees.forEach((employee) => {
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
        data-id="${employee.id}"
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

      /*
    
    
    
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
    
    */
      crudReadModal.insertAdjacentHTML("beforeend", html);
    });

    handleLoader(loader, false);
    handleModal(crudReadModal, true);
  } catch (error) {
    handleLoader(loader, false);
    handleModal(crudReadModal, true);
    messageError.innerHTML = ERROR_READ_MESSAGE;
  }
};

const openModal = () => {
  crudReadModal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  renderEmployees();
};

const closeModal = () => {
  crudReadModal.classList.add("hidden");
  overlay.classList.add("hidden");
  messageError.innerHTML = "";
};

// H A N D L I N G    M O D A L
crudReadButton.addEventListener("click", openModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

crudReadModal.addEventListener("click", async (e) => {
  const clicked = e.target.closest(".delete__icon");
  if (!clicked) return;

  try {
    const res = await Promise.race([
      await fetch(`${API_URL}/employees/${+clicked.dataset.id}`, {
        method: "DELETE",
      }),
      timeout(TIMEOUT_TIME),
    ]);

    if (res.status === HTTPSTATUS_ACCEPTED) {
      hideEmployeeRow(+clicked.dataset.id);
      console.log("DELETER");
    }
  } catch (error) {
    console.log(error);
  }
});

const hideEmployeeRow = (id) => {
  const emplyeeRow = document
    .querySelector(`.delete__icon[data-id="${id}"]`)
    .closest(".employee__row");

  emplyeeRow.classList.add("emplyee__row--hidden");
  setTimeout(() => {
    emplyeeRow.classList.add("hidden");
  }, 400);
};
