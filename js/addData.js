var toastLiveExample = document.getElementById("liveToast");
var toast = new bootstrap.Toast(toastLiveExample);
let src;
let indexEdit = 0;

function addData() {
  if (
    $("#addName")[0]?.value &&
    $("#addAmount")[0]?.value &&
    $("#addDate")[0]?.value &&
    $("#addCategory")[0]?.value
  ) {
    let data = JSON.parse(localStorage.getItem("Expenses"));
    if (data === null) {
      let dataArray = [];
      dataArray.push({
        name: $("#addName")[0]?.value,
        category: $("#addCategory")[0]?.value,
        amount: $("#addAmount")[0]?.value,
        date: $("#addDate")[0]?.value,
        receipt: src,
      });
      localStorage.setItem("Expenses", JSON.stringify(dataArray));
    } else {
      data.push({
        name: $("#addName")[0]?.value,
        category: $("#addCategory")[0]?.value,
        amount: $("#addAmount")[0]?.value,
        date: $("#addDate")[0]?.value,
        receipt: src,
      });
      localStorage.setItem("Expenses", JSON.stringify(data));
    }
    $("#toastbody").html("Transaction Added Successfully.");
    $("#toastbody").prop("class", "text-success");
    toast.show();
    emptyDataFields();
    showData();
    src = undefined;
  } else {
    $("#toastbody").html("Fields Are Empty.");
    $("#toastbody").prop("class", "text-danger");
    toast.show();
    src = undefined;
  }
}

var now = new Date(),
  minDate = now.toISOString().substring(0, 10);
$("#addDate").prop("max", minDate);

function findUniqueCategory() {
  let data = JSON.parse(localStorage.getItem("ExpensesCategory"));
  if (data !== null) {
    return data.filter((e, pos) => data.indexOf(e) === pos);
  }
  return [];
}

function addCategoriesOptions(e) {
  const data = findUniqueCategory();
  let str = "";
  data.map((e) => {
    str += `<option value="${e}">${e}</option>`;
  });
  if (e) {
    $(`#${e}`).html(str);
  } else {
    $("#addCategory").html(str);
  }
}

addCategoriesOptions();
addCategoriesOptions("addCategoryDelete");

function addCategory() {
  if ($("#categoryName")[0]?.value) {
    let data = JSON.parse(localStorage.getItem("ExpensesCategory"));
    if (data !== null) {
      data.push($("#categoryName")[0]?.value);
      localStorage.setItem(
        "ExpensesCategory",
        JSON.stringify(data.filter((e, pos) => data.indexOf(e) === pos))
      );
    } else {
      let dataArr = [];
      dataArr.push($("#categoryName")[0]?.value);
      localStorage.setItem("ExpensesCategory", JSON.stringify(dataArr));
    }
    addCategoriesOptions();
    addCategoriesOptions("addCategoryDelete");
    emptyCategoryFields();
    progressBarWidth();
    showCategories();
    $("#toastbody").html("Category Added Successfully.");
    $("#toastbody").prop("class", "text-success");
    toast.show();
  } else {
    $("#toastbody").html("Fields Are Empty.");
    $("#toastbody").prop("class", "text-danger");
    toast.show();
  }
}

function validateCategory() {
  if ($("#categoryName")[0]?.value) {
    $("#saveCategory").prop("disabled", false);
  } else {
    $("#saveCategory").prop("disabled", true);
  }
}

function emptyCategoryFields() {
  $("#categoryName").val("");
  $("#addCategoryDelete").val("");
}

function emptyDataFields() {
  $("#addName").val("");
  $("#addAmount").val("");
  $("#addDate").val("");
  $("#addReceipt").val("");
}

function validateAddData() {
  if (
    $("#addName")[0]?.value &&
    $("#addAmount")[0]?.value &&
    $("#addDate")[0]?.value &&
    $("#addCategory")[0]?.value
  ) {
    $("#saveData").prop("disabled", false);
  } else {
    $("#saveData").prop("disabled", true);
  }
}

function stopPropogation(e) {
  e.stopPropagation();
}

function uploadVideo(event) {
  const convertBlobToBase64 = () =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(new Blob([event.target.files[0]]));
      return reader;
    });

  convertBlobToBase64().then((res) => {
    src = res;
  });
}

function deleteCategory(valueData, indexData) {
  let categories = JSON.parse(localStorage.getItem("ExpensesCategory"));
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let value;
  let selectedIndex;
  if (valueData === undefined) {
    value = $("#addCategoryDelete")[0].value;
  } else {
    value = valueData;
  }
  if (indexData === undefined) {
    selectedIndex = $("#addCategoryDelete")[0].selectedIndex;
  } else {
    selectedIndex = indexData;
  }
  let arr = data.map((e, index) => {
    if (e.category === value) {
      return index;
    }
  });
  if (arr.filter((e) => e !== undefined).length <= 1) {
    arr.map((e) => {
      if (e !== undefined) {
        data.splice(e, 1);
      }
    });
    categories.splice(selectedIndex, 1);
    localStorage.setItem("ExpensesCategory", JSON.stringify(categories));
    localStorage.setItem("Expenses", JSON.stringify(data));
    addCategoriesOptions("addCategoryDelete");
    $("#toastbody").html("Category Deleted Successfully.");
    $("#toastbody").prop("class", "text-success");
    showData();
    progressBarWidth();
    showCategories();
    toast.show();
  } else {
    $("#toastbody").html(
      `${
        $("#addCategoryDelete")[0].value
      } category has more than 1 transaction.`
    );
    $("#toastbody").prop("class", "text-danger");
    toast.show();
  }
}

function deleteData(index, category) {
  let data = JSON.parse(localStorage.getItem("Expenses"));
  data.splice(index, 1);
  localStorage.setItem("Expenses", JSON.stringify(data));
  showData(category);
  $("#toastbody").html("Transaction Deleted Successfully.");
  toast.show();
}

function showData(category, date, history) {
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let displayData = "";
  if (data && data.length > 0) {
    data.map((e, index) => {
      if (
        category !== undefined &&
        e.category === category &&
        date === undefined
      ) {
        displayData += `
        <div class="card container-xxl mb-3 cardhover">
      <div class="card-body row">
        <div class="d-flex align-items-center col col-sm-7">
          <img
            src="${createURL()}"
            alt="Profile"
            width="50"
            height="50"
            class="me-2 rounded"
          />
          <div class="">
            <p class="me-2 fs-4 mb-0">${e.name}</p>
            <p class="text-muted fs-italic mb-0">${e.date}</p>
          </div>
        </div>
        <div class="col col-sm-3 d-flex align-items-center">
          <p class="mb-0">&#8377;${e.amount}.00</p>
        </div>
        <div class="col col-sm-2 d-flex align-items-center justify-content-center">
          <button
            onClick="deleteData(${index}, ${category})"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button
            onClick="editFieldsFilled(${index}, ${category})"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editDataModal"
            class="btn btnhover"
            data-bs-placement="top"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pencil bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </button>
          ${
            e.receipt
              ? `<a
            href="${e.receipt}"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Download Receipt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-down-circle bihover"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
              />
            </svg>
          </a>`
              : ""
          }
        </div>
      </div>
    </div>`;
      }
      if (category === undefined && date === undefined) {
        const bnud = overallBudget(e.category);
        let amount = +e.amount;
        let per = (amount / bnud) * 100;
        displayData += `
        <div class="card container-xxl mb-3 cardhover">
      <div class="card-body row">
        <div class="d-flex align-items-center col col-sm-7">
          <img
            src="${createURL()}"
            alt="Profile"
            width="50"
            height="50"
            class="me-2 rounded"
          />
          <div class="">
            <p class="me-2 fs-4 mb-0">${e.name}</p>
            <p class="text-muted fs-italic mb-0">${e.date}</p>
          </div>
        </div>
        <div class="col col-sm-3">
          <p class="text-muted mb-0">${e.category}</p>
          <p class="mb-0">&#8377;${e.amount}.00</p>
        </div>
        <div class="col col-sm-2 d-flex align-items-center justify-content-center">
          <button
            onClick="deleteData(${index})"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button
            onClick="editFieldsFilled(${index})"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editDataModal"
            class="btn btnhover"
            data-bs-placement="top"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pencil bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </button>
          ${
            e.receipt
              ? `<a
            href="${e.receipt}"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Download Receipt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-down-circle bihover"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
              />
            </svg>
          </a>`
              : ""
          }
        </div>
      </div>
      ${
        history === "history"
          ? `<div class="card-body"><div class="progress">
      <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${per}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div></div>`
          : ""
      }
    </div>`;
      }
      if (date !== undefined && category === undefined && e.date === date) {
        const bnud = overallBudget(e.category);
        let amount = +e.amount;
        let per = (amount / bnud) * 100;
        displayData += `
        <div class="card container-xxl mb-3 cardhover">
      <div class="card-body row">
        <div class="d-flex align-items-center col col-sm-7">
          <img
            src="${createURL()}"
            alt="Profile"
            width="50"
            height="50"
            class="me-2 rounded"
          />
          <div class="">
            <p class="me-2 fs-4 mb-0">${e.name}</p>
            <p class="text-muted fs-italic mb-0">${e.date}</p>
          </div>
        </div>
        <div class="col col-sm-3">
          <p class="text-muted mb-0">${e.category}</p>
          <p class="mb-0">&#8377;${e.amount}.00</p>
        </div>
        <div class="col col-sm-2 d-flex align-items-center justify-content-center">
          <button
            onClick="deleteData(${index})"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
          <button
            onClick="editFieldsFilled(${index})"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editDataModal"
            class="btn btnhover"
            data-bs-placement="top"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-pencil bihover"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </button>
          ${
            e.receipt
              ? `<a
            href="${e.receipt}"
            type="button"
            class="btn btnhover"
            data-bs-placement="top"
            title="Download Receipt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-down-circle bihover"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
              />
            </svg>
          </a>`
              : ""
          }
        </div>
      </div>
      ${
        history === "history"
          ? `<div class="card-body"><div class="progress">
      <div class="progress-bar progress-bar-striped" role="progressbar" style="width: ${per}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div></div>`
          : ""
      }
    </div>`;
      }
    });
  }
  if (displayData === "") {
    displayData = `<div class="text-center w-100 h-100 d-flex justify-content-center flex-column">
      <div><svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg></div>
    No Transaction Available</div>`;
  }
  $("#homeData").html(displayData);
  $("#transactionData").html(displayData);
}

showData();

function editFieldsFilled(index) {
  addCategoriesOptions("editCategory");
  indexEdit = index;
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let transaction = data[index];
  $("#editName").val(transaction.name);
  $("#editAmount").val(transaction.amount);
  $("#editDate").val(transaction.date);
  $("#editCategory").val(transaction.category);
}

function createURL() {
  return `https://picsum.photos/id/${Math.floor(
    Math.random() * 100 + 1
  )}/200/300`;
}

function editData(category) {
  if (
    $("#editName")[0]?.value &&
    $("#editAmount")[0]?.value &&
    $("#editDate")[0]?.value &&
    $("#editCategory")[0]?.value
  ) {
    let data = JSON.parse(localStorage.getItem("Expenses"));
    let fieldData = {
      name: $("#editName")[0]?.value,
      category: $("#editCategory")[0]?.value,
      amount: $("#editAmount")[0]?.value,
      date: $("#editDate")[0]?.value,
      receipt: src === undefined ? data[indexEdit].receipt : src,
    };
    data[indexEdit] = fieldData;
    localStorage.setItem("Expenses", JSON.stringify(data));
    $("#toastbody").html("Transaction Edited Successfully.");
    $("#toastbody").prop("class", "text-success");
    toast.show();
    showData(category);
    src = undefined;
  } else {
    $("#toastbody").html("Fill All Fields.");
    $("#toastbody").prop("class", "text-danger");
    toast.show();
    src = undefined;
  }
}

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

function overallBudget(category) {
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let amount = 0;
  if (data !== null) {
    data.map((e) => {
      if (category !== undefined && category === e.category) {
        amount += +e.amount;
      }
      if (category === undefined) {
        amount += +e.amount;
      }
    });
  }
  return amount;
}

function progressBarWidth() {
  $("#dataprogress").html("");
  let categories = JSON.parse(localStorage.getItem("ExpensesCategory"));
  const totalAmount = overallBudget();
  let maxIndex = 0;
  categories.map((e, index) => {
    if (index < 5) {
      const bnud = overallBudget(e);
      let per = (bnud / totalAmount) * 100;
      let str = `<div class="m-2"><div class="progressbar" id="progressBar"><div class="progress-bar progress-bar-striped progressbarw" role="progressbar" style="height: ${per}%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div></div>${e.substring(
        0,
        4
      )}</div>`;
      $("#dataprogress").append(str);
    } else {
      maxIndex++;
    }
  });
  if (maxIndex !== 0) {
    $("#dataprogress").append(
      `<div class="moreSection d-none d-xl-flex">+${maxIndex} more</div>`
    );
  }

  if (categories.length === 0) {
    $("#dataprogress").append(
      `<div class="text-center w-100 h-100 d-flex justify-content-center flex-column">
      <div><svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg></div>
      plz Add Category</div>`
    );
  }
}

progressBarWidth();
