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
    emptyCategoryFields();
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

function deleteCategory() {
  let categories = JSON.parse(localStorage.getItem("ExpensesCategory"));
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let arr = data.map((e, index) => {
    if (e.category === $("#addCategoryDelete")[0].value) {
      return index;
    }
  });
  if (arr.filter((e) => e !== undefined).length <= 1) {
    arr.map((e) => {
      if (e !== undefined) {
        data.splice(e, 1);
      }
    });
    categories.splice($("#addCategoryDelete")[0].selectedIndex, 1);
  } else {
    $("#toastbody").html(
      `${
        $("#addCategoryDelete")[0].value
      } category has more than 1 transaction.`
    );
    $("#toastbody").prop("class", "text-danger");
    toast.show();
  }
  localStorage.setItem("ExpensesCategory", JSON.stringify(categories));
  localStorage.setItem("Expenses", JSON.stringify(data));
  emptyCategoryFields();
  addCategoriesOptions("addCategoryDelete");
  $("#toastbody").html("Category Deleted Successfully.");
  toast.show();
}

function deleteData(index, category) {
  let data = JSON.parse(localStorage.getItem("Expenses"));
  data.splice(index, 1);
  localStorage.setItem("Expenses", JSON.stringify(data));
  showData(category);
  $("#toastbody").html("Transaction Deleted Successfully.");
  toast.show();
}

function showData(category) {
  let data = JSON.parse(localStorage.getItem("Expenses"));
  let displayData = "";
  if (data && data.length > 0) {
    data.map((e, index) => {
      if (category !== undefined && e.category === category) {
        displayData += `<div>${e.name} ${e.category}<button onClick="deleteData(${index}, ${category})">delete</button></div>`;
      }
      if (category === undefined) {
        displayData += `
        <div class="card container mb-3 cardhover">
      <div class="card-body row">
        <div class="d-flex align-items-center col-7">
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
        <div class="col-3">
          <p class="text-muted mb-0">${e.category}</p>
          <p class="mb-0">&#8377;${e.amount}</p>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
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
    </div>`;
      }
    });
  } else {
    displayData = "No Transaction Available";
  }
  $("#homeData").html(displayData);
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
