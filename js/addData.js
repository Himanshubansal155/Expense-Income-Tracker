var toastLiveExample = document.getElementById("liveToast");
var toast = new bootstrap.Toast(toastLiveExample);

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
        receipt: $("#addReceipt")[0]?.value,
      });
      localStorage.setItem("Expenses", JSON.stringify(dataArray));
    } else {
      data.push({
        name: $("#addName")[0]?.value,
        category: $("#addCategory")[0]?.value,
        amount: $("#addAmount")[0]?.value,
        date: $("#addDate")[0]?.value,
        receipt: $("#addReceipt")[0]?.value,
      });
      localStorage.setItem("Expenses", JSON.stringify(data));
    }
    $("#toastbody").html("Transaction Added Successfully.");
    $("#toastbody").prop('class', "text-success");
    toast.show();
    emptyDataFields();
  } else {
    $("#toastbody").html("Fields Are Empty.");
    $("#toastbody").prop('class', "text-danger");
    toast.show();
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

function addCategoriesOptions() {
  const data = findUniqueCategory();
  let str = "";
  data.map((e) => {
    str += `<option value="${e}">${e}</option>`;
  });
  $("#addCategory").html(str);
}

addCategoriesOptions();

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
    $("#toastbody").prop('class', "text-success");
    toast.show();
  } else {
    $("#toastbody").html("Fields Are Empty.");
    $("#toastbody").prop('class', "text-danger");
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
}

function emptyDataFields() {
  $("#addName").val("");
  $("#addCategory").val("");
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
