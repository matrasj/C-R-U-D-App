// selectedCriterium.options[selectedCriterium.selectedIndex].value

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
import { API_URL, handleLoader, handleModal } from "./help.js";
import { TIMEOUT_TIME } from "./help.js";
import { timeout } from "./help.js";
import { SEARCH_BY_FIRST_NAME_LABEL } from "./help.js";
import { SEARCH_BY_LAST_NAME_LABEL } from "./help.js";
import { SEARCH_BY_SALARY_LABEL } from "./help.js";
import { HTTPSTATUS_ACCEPTED } from "./help.js";
import { ERROR_MESSAGE } from "./help.js";
import { NO_SUCH_USER_MESSAGE } from "./help.js";

const selectedCriterium = document.querySelector("#criterium");
const loader = document.querySelector("#loader");
const overlay = document.querySelector(".overlay");
const findingInputEl = document.querySelector("#finding__input");
const findingInputIconEl = document.querySelector(".search__icon");
const findingForm = document.querySelector(".finding__form");
const findingLabel = document.querySelector(".finding__label");
const crudFindModal = document.querySelector(".crud__find--modal");
const limitSalaryContainer = document.querySelector("#limit__container");
const limitInputEl = document.querySelector("#limit");

const setSearchingLabel = () => {
  switch (selectedCriterium.options[selectedCriterium.selectedIndex].value) {
    case "firstName":
      {
        closeSalaryLimitInput();
        findingLabel.innerHTML = SEARCH_BY_FIRST_NAME_LABEL;
        findingCriterium = "findByFirstName";
        findingInputEl.type = "text";
      }
      break;

    case "lastName":
      {
        closeSalaryLimitInput();
        findingLabel.innerHTML = SEARCH_BY_LAST_NAME_LABEL;
        findingCriterium = "findByLastName";
        findingInputEl.type = "text";
      }
      break;

    case "salary":
      {
        findingLabel.innerHTML = SEARCH_BY_SALARY_LABEL;
        findingInputEl.type = "number";
        findingInputEl.step = "0.01";
        findingCriterium = "findBySalary";
        displaySalaryLimitInput();
      }
      break;
  }
};

const displaySalaryLimitInput = () => {
  setTimeout(() => {
    limitSalaryContainer.style.opacity = 1;
  }, 200);
};

const closeSalaryLimitInput = () => {
  setTimeout(() => {
    limitSalaryContainer.style.opacity = 0;
  }, 200);
};

let findingCriterium;
setSearchingLabel();

selectedCriterium.addEventListener("change", setSearchingLabel);

findingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedCriteriumValue =
    selectedCriterium.options[selectedCriterium.selectedIndex].value;

  try {
    handleLoader(loader, true);
    handleModal(crudFindModal, false);
    const res = await Promise.race([
      await fetch(
        `${API_URL}/employees/${findingCriterium}?${selectedCriteriumValue}=${
          findingInputEl.value
        }${
          selectedCriteriumValue === "salary"
            ? `&limit=${limitInputEl.value ? limitInputEl.value : "0.0"}`
            : ""
        }`,
        {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      ),
      timeout(TIMEOUT_TIME),
    ]);

    const foundEmployees = await res.json();
    if (foundEmployees.length === 0) {
      document.querySelector(".user__found--error-message").innerHTML =
        NO_SUCH_USER_MESSAGE;
    }
    clearModalFromEmployeesRows();
    foundEmployees.forEach((employee) => {
      insertEmployeeRow(employee);
    });

    crudFindModal.querySelectorAll(".employee__row").forEach((row) => {
      row.style.opacity = 0;
    });

    setTimeout(() => {
      crudFindModal.querySelectorAll(".employee__row").forEach((row) => {
        row.style.opacity = 1;
      });
    }, 200);

    handleLoader(loader, false);
    handleModal(crudFindModal, true);
  } catch (error) {
    handleLoader(loader, false);
    handleModal(crudFindModal, true);

    document.querySelector(".user__found--error-message").innerHTML =
      ERROR_MESSAGE;
  }
});

const clearModalFromEmployeesRows = () => {
  crudFindModal.querySelectorAll(".employee__row").forEach((row) => {
    crudFindModal.removeChild(row);
  });
};

const insertEmployeeRow = (employee) => {
  const htmlRow = `
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
  crudFindModal.insertAdjacentHTML("beforeend", htmlRow);
};

const closeModal = () => {
  crudFindModal.classList.add("hidden");
  overlay.classList.add("hidden");
  findingInputEl.value = "";
  limitInputEl.value = "";
  crudFindModal.querySelectorAll(".employee__row").forEach((row) => {
    crudFindModal.removeChild(row);
  });
  selectedCriterium.value = "firstName";
  document.querySelector(".user__found--error-message").innerHTML = "";
  setSearchingLabel();
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

overlay.addEventListener("click", closeModal);

crudFindModal.addEventListener("click", async (e) => {
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
