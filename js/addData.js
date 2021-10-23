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
        displayData += `<div><span id="number${index}">${
          index + 1
        }.</span><img src="${createURL()}" alt="Profile" width='50' height='50'>${
          e.name
        } ${
          e.category
        }<button onClick="deleteData(${index})" type="button" class="btn btn-primary">delete</button> <button onClick="editFieldsFilled(${index})" type="button" data-bs-toggle="modal" data-bs-target="#editDataModal" class="btn btn-primary">Edit</button>${
          e.receipt ? `<a href="${e.receipt}">Download Receipt</a>` : ""
        }</div>`;
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

function editData() {
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
    showData();
    src = undefined;
  } else {
    $("#toastbody").html("Fill All Fields.");
    $("#toastbody").prop("class", "text-danger");
    toast.show();
    src = undefined;
  }
}
